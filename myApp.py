from flask import Flask, render_template, request, url_for, redirect

count = 0
queue = []

app = Flask(__name__)

@app.route("/", methods=['POST', 'GET'])
def home():
    global count
    global queue
    que = queue
    cnt = count
    name = "John Smith"
    return render_template("index.html", username = name, counter = cnt, mylist = que)
@app.route("/user/<my_name>")
def login(my_name):
    return render_template("index.html")

@app.route("/add", methods=["POST"])
def add():
    global count
    global queue
    count += 1
    queue.append(request.form.get("entry"))
    for thing in queue:
        print(thing)
    print("Button pushed by user!")
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

#flask --app myApp run --host=0.0.0.0
#Look into HTML escaping if time for more security