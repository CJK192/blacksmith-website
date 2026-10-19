from flask import Flask, render_template, request, url_for, redirect, jsonify
from flask_cors import CORS
from Item import *
import threading
import time

count = 0
queue = []
ordersQueue = []
queue_to_display = []

app = Flask(__name__)
CORS(app)


def work():
    while True:
        if (len(queue) > 0):
            time.sleep(queue[0].get_duration() * queue[0].get_quantity())
            if (queue[0].get_quantity() > 1):
                print(f"completed {queue[0].get_quantity()} {queue[0].get_name()}s")

            else:
                print(f"completed {queue[0].get_name()}")

            print(f"ID: {queue[0].get_ID()}")

            queue_to_display.pop(0)
            queue.pop(0)


@app.route("/api/queue", methods=["GET"])
def get_queue():
    return jsonify({"queue": queue_to_display})

@app.route("/api/add", methods=["POST"])
def add():
    global count, queue
    data = request.get_json()
    count += 1
    current_order = Order(ID=data.get('entry').get('id'))
    for thing in data.get('entry').get('items'):
            
            current_order.add_item(Item(name=thing.get('name'), quantity=thing.get('quantity'), cost=thing.get('price'), color=thing.get('color'), duration=thing.get('duration'), ID=current_order.get_id()))
        
    ordersQueue.append(current_order)
    for item in current_order.get_items():
         queue.append(item)
    for item in current_order.get_items():
        queue_to_display.append(f"{item.get_quantity()} {item.get_color()} {item.get_name()}")
    printQueue()
    #Edit
    return jsonify({"queue": item.to_dict() for item in queue})

def printQueue():
    for thing in ordersQueue:
      #  print("THESE ARE THE ACTUAL ITEMS: " + str(thing.get_items()))
        print(str(thing))
    print(len(ordersQueue))

gunter = threading.Thread(target=work)
gunter.start()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

#flask --app myApp run --host=0.0.0.0
#Look into HTML escaping if time for more security