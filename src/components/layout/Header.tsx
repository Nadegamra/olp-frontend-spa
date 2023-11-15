import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { sessionEnded } from '../../features/auth/AuthSlice'

function Header() {
    const { user, role } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [theme, setTheme] = useState<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark'
    )

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme !== null) {
            setTheme(theme as 'light' | 'dark')
            document.documentElement.setAttribute('data-theme', theme as 'light' | 'dark')
        } else {
            setTheme('dark')
            document.documentElement.setAttribute('data-theme', 'dark')
        }
    }, [])

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
        <header>
            <nav className="bg-clr-bg1 border-clr-border px-4 sm:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center max-w-screen">
                    <div className="flex sm:order-2">
                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-clr-text1 rounded-lg sm:hidden hover:bg-clr-bg2 focus:outline-none focus:ring-2 focus:ring-clr-link"
                            aria-controls="mobile-menu-2"
                            aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <svg
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex sm:order-3">
                        <li className="list-none px-2">
                            <button
                                onClick={toggleTheme}
                                className="select-none hover:text-clr-hover"
                                aria-label={
                                    theme === 'light'
                                        ? 'Switch to dark mode'
                                        : 'Switch to light mode'
                                }>
                                {theme !== 'light' ? (
                                    <span className="material-symbols-outlined">light_mode</span>
                                ) : (
                                    <span className="material-symbols-outlined">dark_mode</span>
                                )}
                            </button>
                        </li>
                        {user !== undefined && (
                            <li className="select-none hover:text-clr-hover list-none px-2">
                                <Link to={'/settings/public'}>
                                    <span className="material-symbols-outlined">settings</span>
                                </Link>
                            </li>
                        )}
                        {user !== undefined && (
                            <li className="list-none px-2">
                                <button
                                    role="button"
                                    className="select-none hover:text-clr-hover"
                                    onClick={() => {
                                        dispatch(sessionEnded(undefined))
                                        navigate('/')
                                    }}>
                                    <span className="material-symbols-outlined">logout</span>
                                </button>
                            </li>
                        )}
                    </div>
                    <div
                        className="hidden justify-between items-center w-full mr-auto sm:flex sm:w-auto sm:order-1"
                        id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium sm:flex-row sm:space-x-8 sm:mt-0">
                            <li className="select-none hover:text-clr-hover py-2">
                                <Link to={'/'}>Home</Link>
                            </li>

                            {user !== undefined && role === 'CREATOR' && (
                                <li className="select-none hover:text-clr-hover py-2">
                                    <Link to={'/myCourses'}>My Courses</Link>
                                </li>
                            )}
                            {user !== undefined && role === 'ADMIN' && (
                                <li className="select-none hover:text-clr-hover py-2">
                                    <Link to={'/skills'}>Skills</Link>
                                </li>
                            )}
                            {user !== undefined && role === 'ADMIN' && (
                                <li className="select-none hover:text-clr-hover py-2">
                                    <Link to={'/languages'}>Languages</Link>
                                </li>
                            )}
                            {user === undefined && (
                                <li className="select-none hover:text-clr-hover py-2">
                                    <Link to={'/login'}>Login</Link>
                                </li>
                            )}
                            {user === undefined && (
                                <li className="select-none hover:text-clr-hover py-2">
                                    <Link to={'/register'}>Register</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
