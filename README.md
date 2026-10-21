
# Gunter's Blacksmithing

**Team Addition 2** - made by Cole Keller, Josh Lobert, Markus Noll and Felix Wu

> Heads up: this project was made to run with a specific Raspberry Pi, so some parts (the to-do list and checkout) need that Pi or a laptop running our backend to work.

## What is this?
Gunter's Blacksmithing is a pretend online shop for a blacksmith named Gunter. You can look at what he makes, pick a color, add stuff to your cart, and check out. When you check out, your order goes onto **Gunter's To-Do List**, which is basically his work queue, and the backend "makes" each item one at a time.

We also added a little hammer game where you can win a coupon, because why not.

## The idea
We wanted to build a real website that actually talks to a server, not just a page that looks nice. The idea was Gunter works out of his barn, people order things online, and the orders show up on a list so he knows what to make next. The backend runs on a Raspberry Pi so the whole thing is our own setup from start to finish.

## Features
- **Shop** - the home page shows Gunter's inventory: Sword, Chainmail, Plate Armor and Cooking Pot. Click one to see its page.
- **Item pages** - every item has 5 colors (black, red, blue, silver, gold) and the picture changes when you pick a color.
- **Cart** - add things to your cart, change how many you want with + and -, remove stuff, and see the subtotal. Same item in a different color shows up as its own row.
- **Cart saves itself** - if you refresh the page your cart is still there (it's saved in your browser).
- **Coupon codes** - type a coupon at the bottom of the cart. `GUNTERSPRIZE` takes $5 off.
- **Check out** - sends your order to the backend and empties your cart.
- **Gunter's To-Do List** - on the home page, shows what Gunter is working on. It refreshes every 2 seconds, and items come off the list when they're "done".
- **Hammer Time game** - on the Game page (Play Game! button on the home page). Hit the timing bar 10 times, and if you get over 65% quality you win the `GUNTERSPRIZE` coupon.
- **About page** - Gunter's story and our team.
- **Support page** - refund policy and FAQ.
- **Works on phones** - the navbar turns into a menu button and the pages fit on a phone screen.
- **Effects** - sparks when you click, embers on the home page, tilting item pictures, shiny prices and more (see React Bits below).

## What we used and why
- **React** - lets us split the site into pieces (navbar, item pages, cart) and reuse them instead of copying the same code over and over. It also keeps the cart updated on every page at once.
- **Vite** - runs the site while we work on it and updates it right away when we save a file.
- **React Router** - lets us have different pages (home, about, cart, sword, etc.) without the whole site reloading.
- **Flask (Python)** - our backend server. It's simple to set up and Python was easy for us to write the to-do list logic in.
- **Raspberry Pi** - runs the backend so the shop has its own little server.
- **React Bits** - premade animated components so the site looks cool without us having to code every animation from scratch.
- **localStorage** - saves your cart in your browser so it doesn't disappear when you refresh.

## Languages
- **JavaScript (JSX)** - the whole website. JSX is JavaScript that lets you write HTML-looking code inside React.
- **CSS** - how everything looks: colors, layout, the navbar, the phone version.
- **HTML** - the base page the React site loads into (`index.html`).
- **Python** - the backend server (Flask) and the to-do list queue.
- **JSON** - how the website and the backend send the cart and the to-do list back and forth.

## How it works
1. The **frontend** (`frontend/`) is the React site. Your cart lives in `CartContext.jsx` so every page can use it.
2. When you hit **Check Out!**, the cart gets sent to the backend at `/api/add`.
3. The **backend** (`backend/myApp.py`) puts each item in a queue. A background thread works through the queue, waits a set time for each item (like 30 seconds for a sword) times how many you ordered, then takes it off the list.
4. The **to-do list** on the home page asks the backend for the queue (`/api/queue`) every 2 seconds and shows it.

## How to run it
**Website**
```
cd frontend
npm install
npm run dev -- --host
```
Then open the link it gives you. The `--host` part lets other devices on the same Wi-Fi open it too (doesn't work on guest/school Wi-Fi).

**Backend**
```
cd backend
pip install flask flask-cors
flask --app myApp run --host=0.0.0.0
```
- On a Mac, turn off **AirPlay Receiver** (System Settings > General > AirDrop & Handoff) first, it uses port 5000.
- The backend address is typed in `frontend/src/Pages/Cart.jsx` and `frontend/src/components/ToDoList.jsx`. Change it to whatever computer is running the backend (the Pi or a laptop), and it has to end in `:5000`.

## Credits

### AI
We used **AI (Claude, by Anthropic)** to help build parts of this project, mostly:
- the cart (adding, removing, quantities, saving it, the cart page)
- putting the item pictures in and making them change with the color
- the coupon code box
- the navbar and the game page
- adding the React Bits effects
- some styling and fixing stuff for phones

Anywhere AI was used is marked in the code with `AI used` and `AI stopped` comments so you can see exactly which parts it helped with. We also used it to explain code to us so we actually understood what we were putting in.

### React Bits
A lot of the effects come from **[React Bits](https://reactbits.dev)** by David Haz. We used: Click Spark, Pixel Snow, Tilted Card, Decrypted Text, Star Border, Glare Hover, Shiny Text, Profile Card, Scroll Reveal, Animated List, Count Up, Faulty Terminal, Pill Nav and Spotlight Card. They're in `frontend/src/components/reactbits/` and each file says which one it is. React Bits has its own license (MIT + Commons Clause), there's a copy in `frontend/src/components/HammerTime/REACT-BITS-LICENSE.md`.

## What we learned
This project took hours and hours of work, learning, failing and bug fixing. Through it we learned:
- the React framework
- how to manage a project with more than one coding language (JavaScript and Python)
- HTTP requests and networking
- how to write our own server
- working on the same code as a team with GitHub (and not overwriting each other's stuff lol)

and much, much more. Our project isn't perfect, but we hope you look at it through how many skills it taught us.

Thank you so much for checking out our project, hope you like it! C:

