import { Link } from 'react-router-dom'
import Header from './Header';


function NavBar()
{
    return <div >   
        <Header />
            <ul className="NavBar">
                <Link to ='/'><li> Home</li> </Link>
                <Link to ='/about'><li> About</li> </Link>
                <Link to ='/support'><li> Support</li> </Link>
                <Link to ='/cart'><li> Cart</li> </Link>
            </ul>
        </div>

    
   
}
export default NavBar;