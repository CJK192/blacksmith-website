// new navbar- AI used
import { Link, useLocation } from 'react-router-dom'
import PillNav from './reactbits/PillNav';
import AnvilIcon from './AnvilIcon';
import './NavBar.css';

// navbar pages, add one here to put it on the navbar
const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Support', href: '/support' },
    { label: 'Cart', href: '/cart' },
];

// Link needs "to" not "href"
function RouterLink({ href, ...props })
{
    return <Link to={href} {...props} />
}

function NavBar()
{
    // page you're on gets highlighted
    const page = useLocation().pathname;

    return <header className="site-nav">
        <Link to="/" className="site-nav__brand" aria-label="Gunter's Blacksmithing - home">
            <span className="site-nav__anvil" aria-hidden="true"><AnvilIcon /></span>
            <span className="site-nav__name">Gunter's Blacksmithing</span>
        </Link>

        <div className="site-nav__links">
            <PillNav
                items={navItems}
                activeHref={page}
                linkComponent={RouterLink}
                size="md"
                surface="none"
                itemStyle="text"
                hoverEffect="glide"
                indicator="dot"
                textColor="#ffffff"
                highlightColor="#ffdd00"
                highlightTextColor="#0e0e0e"
                intro={false} // animation was buggy so its off
                ariaLabel="Main"
            />
        </div>
    </header>
}

export default NavBar;
// AI stopped
