import json

class Item:
    def __init__(self, name, duration, cost, color, quantity, ID):
        self.name = name
        self.duration = duration
        self.color  = color
        self.quantity = quantity
        self.cost = cost
        self.ID = ID

    def get_name(self):
        return self.name

    def get_ID(self):
        return self.ID

    def get_duration(self):
        return self.duration

    def get_quantity(self):
        return self.quantity

    def set_duration(self, amount):
        self.duration = amount

    def get_color(self):
        return self.color

    def get_cost(self):
        return self.cost

    def to_dict(self):
        return {
            "id" : self.ID,
            "name" : self.name,
            "quantity" : self.quantity,
            "duration" : self.duration,
            "color" : self.color,
            "cost" : self.cost
        }

    def __str__(self):
        return f"<ITEM\nNAME: {self.name}\nCOST: {self.cost}\nDURATION: {self.duration}\nCOLOR: {self.color}>"

class Order:
    def __init__(self, items = [], ID = None):
        self.id = ID
        self.items = items
        
        
        

    def set_id(self, ids):
        self.id = ids

    def get_id(self):
        return self.id

    def get_items(self):
        return self.items

    def add_item(self, thing):
        self.items.append(thing)

    def get_names(self):
        toret = ""
        for thing in self.items:
            toret += str(thing.get_name())
            toret += " "
        return toret

    def __str__(self):
        return f"<ORDER\nLENGTH: {len(self.items)}\nCONTAINING: {self.get_names()}\nID: {self.get_id()}>"

