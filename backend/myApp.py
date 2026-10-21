from flask import Flask, request, jsonify
from flask_cors import CORS
from Item import *
import threading
import time

#queue for actual item objects (more for data storage)

queue = []

#queue simply for string literals to display to web page

queue_to_display = []



#Initialize Flask app

app = Flask(__name__)
CORS(app)


#Background threaded function constantly running

def work():
    while True:
        #if queue has something in it
        if (len(queue) > 0):
            #give correct duration based on item name
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
            #wait that amount of time multiplied by how many of that item there are
            time.sleep(int(queue[0].get_duration()) * int(queue[0].get_quantity()))

            #backend debug mostly
            if (queue[0].get_quantity() > 1):
                print(f"completed {queue[0].get_quantity()} {queue[0].get_name()}s")

            else:
                print(f"completed {queue[0].get_name()}")

            #Relic from scrapped ID feature
         #   print(f"ID: {queue[0].get_ID()}")

            
            #Pop both queues to move list forward

            queue_to_display.pop(0)
            queue.pop(0)


#HTTP request return the queue as JSON

@app.route("/api/queue", methods=["GET"])
def get_queue():
    return jsonify({"queue": queue_to_display})


#HTTP request add item(s) to queue from JSON data from frontend

@app.route("/api/add", methods=["POST"])
def add():
    global queue
    data = request.get_json()
    print(f"this is the real data: {data.get('entry').get('items')}")
    for thing in data.get('entry').get('items'):
        queue.append(Item(name=thing.get('name'), quantity=thing.get('quantity'), cost=thing.get('price'), color=thing.get('color'), duration=thing.get('duration'), ID=data.get('id')))
        queue_to_display.append(f"{thing.get('quantity')} {thing.get('color')} {thing.get('name')}")
        
    printQueue()
    
    return jsonify({"queue": item.to_dict() for item in queue})

#Debug funtion
#Prints items in queue
#Usefull for locating bugs

def printQueue():
    for thing in queue:
        print(str(thing))
    print(len(queue))

#Use threading to run work function constantly

gunter = threading.Thread(target=work)
gunter.start()

#Don't host server if this isn't the main script (mostly redundancy but safe code is good)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)


# VVVV Reminder bc I have a bad memory

#flask --app myApp run --host=0.0.0.0