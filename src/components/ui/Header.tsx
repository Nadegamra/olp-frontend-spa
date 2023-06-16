import { Link } from 'react-router-dom'

function Header() {
    return (
        <nav className="bg-bg-secondary text-t-primary h-16">
            <Link to={'/'}>Home</Link>
            <Link to={'/profile'}>Profile</Link>
        </nav>
    )
}

export default Header
