# support helper server. it runs on its own port (5001) so cole's to do list server isnt touched
# start it with: flask --app assistant run --host=0.0.0.0 --port=5001

import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from ollama import Client, ResponseError

# load_dotenv reads backend/.env so the api key never has to be written in the code
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = Flask(__name__)
CORS(app)

# connects to ollama cloud with the key, the model can be changed in .env
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL") or "gemma4:31b"
client = Client(
    host="https://ollama.com",
    headers={"Authorization": f"Bearer {os.environ.get('OLLAMA_API_KEY', '')}"},
)

SYSTEM_PROMPT = """You are the customer service agent for Gunter's Blacksmithing, a small family blacksmith shop. Gunter started forging as a hobby in his barn and grew it into a business, and he cares a lot about his customers. You chat with shoppers through the help box on the shop's website.

Act like a real, experienced customer service rep for a small business: warm, patient and professional. Greet people, thank them, and treat every question as worth answering. When someone is frustrated or has a problem, acknowledge it and apologize for the trouble before helping. If a question is unclear, ask a short follow-up question instead of guessing. Before wrapping up, check whether there's anything else you can help with.

Shop information (this is everything you know - don't make up anything else):
- Products and prices: Sword $79.00, Chainmail $420.00, Plate Armor $210.00, Cooking Pot $67.00. Each is handmade by Gunter.
- Every product comes in Black, Red, Blue, Silver or Gold.
- How to order: open a product from the home page, choose a color, press Add to Cart, then go to the Cart page and press Check Out!
- In the cart, shoppers can change quantities with the - and + buttons or remove items. Their cart is saved in their browser if they refresh.
- Discounts: there's a coupon box on the Cart page. Shoppers can earn a $5 off coupon by playing Hammer Time (the Play Game! button on the home page) and finishing a round above 65% forge quality. Never give the coupon code out yourself - point them to the game.
- Order progress: after checkout, orders appear on Gunter's To-Do List on the home page while he makes them, and drop off the list when they're done.
- Refund and return policy: no refunds after 48 hours. Be kind but don't promise exceptions.

What you can't do: you can't look up, change or cancel orders, take payments, or see anyone's personal information. You don't have information on shipping, delivery times, custom orders, sizing or anything else not listed above. In those cases, say so honestly, apologize, and direct them to the Support page so the team can help - never invent details or policies.

Keep replies short, a few sentences at most, in plain text with no markdown or lists, since they show up in a small chat bubble. If someone asks about something unrelated to the shop, politely let them know you can only help with Gunter's Blacksmithing."""

MAX_HISTORY = 20
MAX_MESSAGE_LEN = 1000

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    history = data.get("messages")

    # only let through user/assistant text messages, keep the last 20, cut each one to 1000 characters,
    # and make sure the chat starts and ends with the user
    if not isinstance(history, list) or not history:
        return jsonify({"error": "No message sent."}), 400
    messages = []
    for message in history[-MAX_HISTORY:]:
        role = message.get("role") if isinstance(message, dict) else None
        content = message.get("content") if isinstance(message, dict) else None
        if role not in ("user", "assistant") or not isinstance(content, str) or not content.strip():
            return jsonify({"error": "Bad message."}), 400
        messages.append({"role": role, "content": content.strip()[:MAX_MESSAGE_LEN]})
    while messages and messages[0]["role"] != "user":
        messages.pop(0)
    if not messages or messages[-1]["role"] != "user":
        return jsonify({"error": "Last message has to be from you."}), 400

    if not os.environ.get("OLLAMA_API_KEY"):
        return jsonify({"error": "The helper doesn't have an API key yet (put it in backend/.env)."}), 500

    try:
        response = client.chat(
            OLLAMA_MODEL,
            messages=[{"role": "system", "content": SYSTEM_PROMPT}] + messages,
            stream=False,
        )
    except ResponseError as e:
        print(f"Ollama error {e.status_code}: {e.error}")
        if e.status_code in (401, 403):
            return jsonify({"error": "The helper's API key isn't working."}), 500
        if e.status_code == 429:
            return jsonify({"error": "The helper is busy, try again in a minute."}), 429
        if e.status_code == 404:
            return jsonify({"error": f"The model {OLLAMA_MODEL} wasn't found."}), 500
        return jsonify({"error": "The helper had a problem, try again."}), 502
    except Exception as e:
        print(f"Couldn't reach Ollama: {e}")
        return jsonify({"error": "The helper can't reach the internet right now."}), 503

    reply = (response.message.content or "").strip()
    return jsonify({"reply": reply or "Sorry, I didn't catch that. Can you ask again?"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

