import { Link } from 'react-router-dom'

function NavBar()
{
    return <ul className="NavBar">
       <Link to ='/'><li> Home</li> </Link>
        <Link to ='/about'><li> About</li> </Link>
        <Link to ='/support'><li> Support</li> </Link>
        <Link to ='/cart'><li> Cart</li> </Link>
        
    </ul>
}
export default NavBar;