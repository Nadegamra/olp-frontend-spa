import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/public/HomePage'
import ProfilePage from '../../pages/user/ProfilePage'
import useAuth from '../../stores/AuthStore'
import ConditionalRoute from './ConditionalRoute'
import LoginPage from '../../pages/public/LoginPage'
import RegisterPage from '../../pages/public/RegisterPage'
import PageNotFoundPage from '../../pages/public/PageNotFoundPage'

function AppRoutes() {
    const { user, role } = useAuth()
    console.log(user)
    console.log(role)
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<ConditionalRoute condition={user !== undefined} />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<ConditionalRoute condition={user === undefined} redirect="/" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes
