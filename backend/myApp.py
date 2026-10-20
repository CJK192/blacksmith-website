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
            match (queue[0].get_name()):
                case 'Sword': 
                    queue[0].set_duration(30)
                case 'PlateArmor':
                    queue[0].set_duration(45)
                case 'Chainmail':
                    queue[0].set_duration(40)
                case 'CookingPot':
                    queue[0].set_duration(15)
                case _:
                    queue[0].set_duration(35)
            time.sleep(int(queue[0].get_duration()) * int(queue[0].get_quantity()))
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
    global count, queue, ordersQueue
    data = request.get_json()
    print(f"this is the real data: {data.get('entry').get('items')}")
    for thing in data.get('entry').get('items'):
        queue.append(Item(name=thing.get('name'), quantity=thing.get('quantity'), cost=thing.get('price'), color=thing.get('color'), duration=thing.get('duration'), ID=data.get('id')))
        queue_to_display.append(f"{thing.get('quantity')} {thing.get('color')} {thing.get('name')}")
        
    printQueue()
    #Edit
    return jsonify({"queue": item.to_dict() for item in queue})

def printQueue():
    for thing in queue:
      #  print("THESE ARE THE ACTUAL ITEMS: " + str(thing.get_items()))
        print(str(thing))
    print(len(queue))

gunter = threading.Thread(target=work)
gunter.start()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

#flask --app myApp run --host=0.0.0.0
#Look into HTML escaping if time for more security