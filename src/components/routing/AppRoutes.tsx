import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import ProfilePage from '../../pages/ProfilePage'
import useAuth from '../../stores/AuthStore'
import ConditionalRoute from './ConditionalRoute'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'

function AppRoutes() {
    const { user, role } = useAuth()
    console.log(user)
    console.log(role)
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route element={<ConditionalRoute condition={user === undefined} redirect="/" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
