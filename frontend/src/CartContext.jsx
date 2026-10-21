import { createContext, useContext, useEffect, useState } from 'react';

// createContext makes a shared "box" for the cart, any page can open it with useCart()
const CartContext = createContext();

const SAVE_NAME = 'gunters-cart';

// when the site opens, grab the cart we saved in the browser last time. if there isnt one or its broken, start with an empty cart
function loadCart() {
  try {
    const saved = localStorage.getItem(SAVE_NAME);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// every page has access to cart now, because the box is wrapped around the whole app in main.jsx
export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);
  
  // AI use starts here

  // useEffect runs every time the cart changes and saves it to the browser as text (JSON), so refreshing doesnt empty it
  useEffect(() => {
    try {
      localStorage.setItem(SAVE_NAME, JSON.stringify(cart));
    } catch {
      return;
    }
  }, [cart]);

  //AI use ends here

  //josh i will never forgive you for writing this code

  function clearCart()
  {
    setCart([]);
  }

  // if the same item in the same color is already in the cart, add 1 to its quantity. otherwise add it as a new row
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

  function removeFromCart(name, color) {
    setCart(cart.filter((item) => !(item.name === name && item.color === color)));
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, changeQuantity, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
