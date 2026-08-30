import { Link, useResolvedPath, useMatch, useLocation } from 'react-router-dom'
import Header from './Header';


function NavBar()
{

    let page

    switch(useLocation().pathname)
    {
        case "/":
            page = "home";
            break;
        case "/about":
            page = "about";
            break;
        case "/support":
            page = "support";
            break;
        case "/cart":
            page = "cart";
            break;
        default:
            break;
    }
    
   
    return <div >   
        <Header />
            <ul className="NavBar">
                <Link to ='/'><li id={page === "home" ? "selected" : ""}> Home</li> </Link>
                <Link to ='/about'><li id={page === "about" ? "selected" : ""}> About</li> </Link>
                <Link to ='/support'><li id={page === "support" ? "selected" : ""}> Support</li> </Link>
                <Link to ='/cart'><li id={page === "cart" ? "selected" : ""}> Cart</li> </Link>
            </ul>
            
        </div>

    
   
}
export default NavBar;