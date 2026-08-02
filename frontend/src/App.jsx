import NavBar from './components/NavBar'
import Home from './Pages/Home'
import Support from './Pages/Support'
import About from './Pages/About'
import Cart from './Pages/Cart'

import { Routes, Route } from 'react-router-dom'


function App()
{
  return <div>

  <NavBar />
  <Routes>
    <Route path = '/' element={<Home />}/>
    <Route path = '/support' element={<Support />}/>
    <Route path = '/about' element={<About />}/>
    <Route path = '/cart' element={<Cart />}/>
  </Routes>

  </div>
}

export default App