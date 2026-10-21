import { Link, useLocation } from 'react-router-dom'
import PillNav from './reactbits/PillNav';
import AnvilIcon from './AnvilIcon';
import './NavBar.css';

// the links in the navbar. add a page here and it shows up on desktop and in the phone menu
const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Support', href: '/support' },
    { label: 'Cart', href: '/cart' },
];

// PillNav makes links with "href" but react router's Link wants "to", so this just swaps it
function RouterLink({ href, ...props })
{
    return <Link to={href} {...props} />
}

function NavBar()
{
    // useLocation gives the page you're on, PillNav highlights the link that matches it
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
                intro={false} // the opening animation sometimes got stuck and hid the links, so its off
                ariaLabel="Main"
            />
        </div>
    </header>
}

export default NavBar;
