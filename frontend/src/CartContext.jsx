import { createContext, useContext, useEffect, useState } from 'react';

// the shared box
const CartContext = createContext();

// name the cart is saved under in the browser
const SAVE_NAME = 'gunters-cart';

// LOAD - get the saved cart when the site opens (empty list if there isn't one)
function loadCart() {
  try {
    const saved = localStorage.getItem(SAVE_NAME);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return []; // saved cart is broken or the browser blocks storage - just start empty
  }
}

// every page has access to cart now, because the box is wrapped around the whole app in main.jsx
export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart); // starts with the saved cart
  
  // AI use starts here

  // SAVE - every time the cart changes, write it to the browser
  useEffect(() => {
    try {
      localStorage.setItem(SAVE_NAME, JSON.stringify(cart));
    } catch {
      // browser blocks storage (like some private windows) - cart still works, it just won't be saved
    }
  }, [cart]);

  //AI use ends here

  // adds an item - if the same item in the same color is already in, just add 1 to its quantity
  function addToCart(name, price, color) {
    const alreadyIn = cart.find((item) => item.name === name && item.color === color);

    if (alreadyIn) {
      setCart(cart.map((item) =>
        item === alreadyIn ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { name, price: Number(price), color, quantity: 1 }]);
    }
  }

  // plaus and minus buttons on cart page - if quantity goes to 0, remove the item from the cart
  function changeQuantity(name, color, amount) {
    setCart(cart
      .map((item) =>
        item.name === name && item.color === color ? { ...item, quantity: item.quantity + amount } : item
      )
      .filter((item) => item.quantity > 0)
    );
  }

  // remove button on the cart page
  function removeFromCart(name, color) {
    setCart(cart.filter((item) => !(item.name === name && item.color === color)));
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, changeQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// any page calls useCart() to open the box
export function useCart() {
  return useContext(CartContext);
}
