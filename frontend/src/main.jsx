import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './CartContext'
// click sparks- AI used
import ClickSpark from './components/reactbits/ClickSpark'
// AI stopped

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      {/*sparks when you click anywhere- AI used*/}
      <ClickSpark sparkColor={['#ffdd00', '#ff8c00', '#d32f2f']} sparkSize={12} sparkRadius={25} sparkCount={10} gravity={0.6}>
        <App />
      </ClickSpark>
      {/*AI stopped*/}
    </CartProvider>
    </BrowserRouter>
  
)
