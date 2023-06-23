import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../stores/AuthStore'
import { useEffect, useState } from 'react'

function Header() {
    const { user, role, logout } = useAuth()
    const navigate = useNavigate()
    const [theme, setTheme] = useState<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark'
    )

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme !== undefined) {
            setTheme(theme as 'light' | 'dark')
            document.documentElement.setAttribute('data-theme', theme as 'light' | 'dark')
        }
    }, [])

    //Toggle light/dark mode function
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }

    return (
        <header className="bg-clr-bg2 p-5 flex">
            <a href="#main-content" className="sr-only">
                Skip to main content
            </a>
            <Link className="select-none hover:text-clr-hover" to={'/'}>
                Home
            </Link>
            <div className="flex-1" />
            <nav role="navigation" aria-label="Main Navigation">
                <ul className="flex gap-7">
                    <button
                        onClick={toggleTheme}
                        className="select-none hover:text-clr-hover"
                        aria-label={
                            theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
                        }>
                        {theme === 'light' ? (
                            <span className="material-symbols-outlined">light_mode</span>
                        ) : (
                            <span className="material-symbols-outlined">dark_mode</span>
                        )}
                    </button>
                    {user === undefined && (
                        <li className="select-none hover:text-clr-hover">
                            <Link to={'/login'}>Login</Link>
                        </li>
                    )}
                    {user === undefined && (
                        <li className="select-none hover:text-clr-hover">
                            <Link to={'/register'}>Register</Link>
                        </li>
                    )}
                    {user !== undefined && (
                        <li className="select-none hover:text-clr-hover">
                            <Link to={'/settings/profile'}>
                                <span className="material-symbols-outlined">settings</span>
                            </Link>
                        </li>
                    )}
                    {user !== undefined && (
                        <li>
                            <button
                                role="logout"
                                className="select-none hover:text-clr-hover"
                                onClick={() => {
                                    logout()
                                    navigate('/')
                                }}>
                                <span className="material-symbols-outlined">logout</span>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
