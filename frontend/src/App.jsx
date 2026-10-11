import NavBar from './components/NavBar'
import Home from './Pages/Home'
import Support from './Pages/Support'
import About from './Pages/About'
import Cart from './Pages/Cart'
import ItemPage from './Pages/ItemPage'


import { Routes, Route } from 'react-router-dom'
import SwordPage from './Pages/SwordPage'
import ChainmailPage from './Pages/ChainmailPage'
import PlateArmorPage from './Pages/PlateArmorPage'
import CookingPotPage from './Pages/CookingPotPage'

function App()
{
  return <div>


  <NavBar />
  <Routes>
    <Route path = '/' element={<Home />}/>
    <Route path = '/support' element={<Support />}/>
    <Route path = '/about' element={<About />}/>
    <Route path = '/cart' element={<Cart />}/>
    <Route path = '/item' element={<ItemPage />}/>
    <Route path = '/sword' element={<SwordPage />}/> 
    <Route path = '/chainmail' element={<ChainmailPage />}/>
    <Route path = '/platearmor' element={<PlateArmorPage />}/>
    <Route path = '/cookingpot' element={<CookingPotPage />}/>
  </Routes>

  </div>
}

export default App