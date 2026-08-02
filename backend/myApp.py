from flask import Flask, render_template, request, url_for, redirect, jsonify
from flask_cors import CORS

count = 0
queue = []

app = Flask(__name__)
CORS(app)

@app.route("/api/queue", methods=["GET"])
def get_queue():
    return jsonify({"queue": queue})

@app.route("/api/add", methods=["POST"])
def add():
    global count, queue
    data = request.get_json()
    count += 1
    queue.append(data.get("entry"))
    return jsonify({"queue": queue})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

#flask --app myApp run --host=0.0.0.0
#Look into HTML escaping if time for more security