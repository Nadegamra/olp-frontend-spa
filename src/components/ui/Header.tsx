import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../stores/AuthStore'

function Header() {
    const { user, role, logout } = useAuth()
    const navigate = useNavigate()
    return (
        <header className="bg-bg-secondary p-5 flex">
            <a href="#main-content" className="sr-only">
                Skip to main content
            </a>
            <Link to={'/'}>Home</Link>
            <div className="flex-1" />
            <nav role="navigation" aria-label="Main Navigation">
                <ul className="flex gap-7">
                    {user === undefined && (
                        <li>
                            <Link to={'/login'}>Login</Link>
                        </li>
                    )}
                    {user !== undefined && (
                        <li>
                            <Link to={'/profile'}>Profile</Link>
                        </li>
                    )}
                    {user !== undefined && (
                        <li>
                            <button
                                role="logout"
                                onClick={() => {
                                    logout()
                                    navigate('/')
                                }}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
