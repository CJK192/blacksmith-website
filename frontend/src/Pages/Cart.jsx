import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import AnvilIcon from '../components/AnvilIcon'
import { itemImages } from '../itemImages'
import './Cart.css'
import AnimatedList from '../components/reactbits/AnimatedList'
import CountUp from '../components/reactbits/CountUp'
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
    const put = "http://10.108.51.169:5000/api/add"
    
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

     
     // location.reload();

      
      
    }
    catch(error)
    {
        console.error("error adding item to the queue!");
    }

    
}

/*Cart page here- AI use begins*/

function Cart()
{
    const { cart, changeQuantity, removeFromCart, clearCart } = useCart();
    {/*itemCount adds up all the quantities, subtotal adds up price x quantity for every row*/}
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    {/*if the code matches (caps dont matter) the coupon turns on. the discount is $5 but never more than the subtotal*/}
    const COUPON_CODE = 'GUNTERSPRIZE';
    const [couponInput, setCouponInput] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponMessage, setCouponMessage] = useState('');
    const discount = couponApplied ? Math.min(5, subtotal) : 0;
    const total = subtotal - discount;

    function applyCoupon(event)
    {
        event.preventDefault();
        if (couponInput.trim().toUpperCase() === COUPON_CODE)
        {
            setCouponApplied(true);
            setCouponMessage('Coupon applied! $5 off');
        }
        else
        {
            setCouponApplied(false);
            setCouponMessage("That code doesn't work");
        }
    }

    function removeCoupon()
    {
        setCouponApplied(false);
        setCouponInput('');
        setCouponMessage('');
    }

    {/*if the cart is empty, show a message and a link back to the shop instead*/}
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

        <section className="cart-panel">
            <AnimatedList
                items={cart.map((item) => ({ ...item, id: item.name + item.color }))}
                renderItem={(item) => (
                <div className="cart-row">
                    <div className="cart-picture" aria-hidden="true">
                        {/*picture for that item and color, if we dont have one it shows the anvil*/}
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
                )}
                width="100%" maxHeight="none" gap={16} radius={0} frame={false} showGradients={false} displayScrollbar={false}
                selectOnHover={false} enableArrowNavigation={false} animateOnce
                className="cart-animated-list" itemClassName="cart-list-item"
            />
        </section>

        <section className="cart-panel cart-subtotal">
            <p>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}): <strong>$<CountUp to={subtotal} decimals={2} duration={0.8} /></strong></p>

            <form className="cart-coupon" onSubmit={applyCoupon}>
                <input
                    type="text"
                    value={couponInput}
                    onChange={(event) => setCouponInput(event.target.value)}
                    placeholder="Coupon code"
                    aria-label="Coupon code"
                    disabled={couponApplied}
                />
                {couponApplied
                    ? <button type="button" className="cart-remove" onClick={removeCoupon}>Remove</button>
                    : <button type="submit" className="cart-remove">Apply</button>}
            </form>
            {couponMessage && <p className={couponApplied ? 'cart-coupon-message' : 'cart-coupon-message cart-coupon-message--bad'}>{couponMessage}</p>}

            {couponApplied && <>
                <p className="cart-discount">Coupon ({COUPON_CODE}): -${discount.toFixed(2)}</p>
                <p className="cart-total">Total: <strong>$<CountUp to={total} decimals={2} duration={0.8} /></strong></p>
            </>}
        </section>

        <center><button className='cart-remove' onClick={() => writeCart(cart, getId(), clearCart)}> Check Out!</button></center>

    </main>
}

/*AI use ends here*/

export default Cart;
