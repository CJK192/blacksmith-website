import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './CartContext'
import ClickSpark from './components/reactbits/ClickSpark'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* CartProvider goes around the whole app so every page reads and changes the same cart */}
    <CartProvider>
      {/* ClickSpark wraps the whole site, so a click anywhere makes a burst of sparks in the site's yellow, orange and red */}
      <ClickSpark sparkColor={['#ffdd00', '#ff8c00', '#d32f2f']} sparkSize={12} sparkRadius={25} sparkCount={10} gravity={0.6}>
        <App />
      </ClickSpark>
    </CartProvider>
    </BrowserRouter>
  
)
