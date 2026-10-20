import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import AnvilIcon from '../components/AnvilIcon'
import { itemImages } from '../itemImages'
import './Cart.css'
import SwordPage from './SwordPage'

function getId()
{
    let id = localStorage.getItem("ID")
    if(!id)
    {
       // id = crypto.randomUUID();
       // localStorage.setItem("ID", id);
    }

    return id;
}

async function writeCart(user_cart, user_id, klear_kart)
{
    const put = "http://192.168.86.209:5000/api/add"
    
    const entry = {

        items: user_cart,
        id: user_id,
        status: "pending"
    };

    try{
        const response = await fetch(put, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ entry: entry })
      });
       if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();

      
      console.log("Updated queue:", result.queue);
      console.log(typeof(user_cart));
      localStorage.setItem('gunters-cart', [])
      console.log("set-item")
      klear_kart()
      console.log("cleared cart@!")

      //THIS vvvvv IS NOT HOW I WANT TO DO THIS BUT CANT FIGURE OUT ANOTHER WAY JOSH HOW DOES THIS CART WORK GENUINLEY EXPLAIN
     // location.reload();

      
      
    }
    catch(error)
    {
        console.error("error adding item to the queue!");
    }

    
}

function Cart()
{
    const { cart, setCart, changeQuantity, removeFromCart, clearCart } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false); {/*true after checkout is pressed*/}
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0); {/*adds up all the quantities*/}
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0); {/*adds up price x quantity*/}

    {/*no payment yet - checkout just places the order and empties the cart*/}
    function checkout()
    {
        setOrderPlaced(true);
        setCart([]);
    }

    {/*thank you screen after checkout*/}
    if (orderPlaced)
    {
        return <main className="cart-page">
            <h1>Order Placed!</h1>
            <section className="cart-panel cart-empty">
                <p>Thanks for shopping with Gunter's Blacksmithing.</p>
                <Link to="/" className="cart-shop-link">Back to shop</Link>
            </section>
        </main>
    }

    {/*nothing added yet*/}
    if (cart.length === 0)
    {
        return <main className="cart-page">
            <h1>Your Cart</h1>
            <section className="cart-panel cart-empty">
                <p>Your cart is empty.</p>
                <Link to="/" className="cart-shop-link">Back to shop</Link>
            </section>
        </main>
    }

    return <main className="cart-page">
        <h1>Your Cart</h1>

        {/*one row per item + color*/}
        <section className="cart-panel">
            {cart.map((item) => (
                <div className="cart-row" key={item.name + item.color}>
                    <div className="cart-picture" aria-hidden="true">
                        {/*picture for this item + color, anvil if we don't have one*/}
                        {itemImages[item.name]?.[item.color] ? <img src={itemImages[item.name][item.color]} alt="" /> : <AnvilIcon />}
                    </div>

                    <div className="cart-info">
                        <h2>{item.name}</h2>
                        <p>Color: {item.color}</p>
                        <p>${item.price.toFixed(2)} each</p>
                    </div>

                    <div className="cart-quantity">
                        <button onClick={() => changeQuantity(item.name, item.color, -1)} aria-label={'One less ' + item.name}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.name, item.color, 1)} aria-label={'One more ' + item.name}>+</button>
                    </div>

                    <p className="cart-row-total">${(item.price * item.quantity).toFixed(2)}</p>

                    <button className="cart-remove" onClick={() => removeFromCart(item.name, item.color)}>Remove</button>
                </div>
            ))}
        </section>

        {/*total at the bottom*/}
        <section className="cart-panel cart-subtotal">
            <p>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}): <strong>${subtotal.toFixed(2)}</strong></p>
            <button className="cart-checkout" onClick={checkout}>Checkout</button>
        </section>

        <center><button className='cart-remove' onClick={() => writeCart(cart, getId(), clearCart)}> Check Out!</button></center>

    </main>
}

export default Cart;
