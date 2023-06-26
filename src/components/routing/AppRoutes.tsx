import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/public/HomePage'
import SettingsPage from '../../pages/user/SettingsPage'
import useAuth from '../../stores/AuthStore'
import ConditionalRoute from './ConditionalRoute'
import LoginPage from '../../pages/public/LoginPage'
import RegisterPage from '../../pages/public/RegisterPage'
import PageNotFoundPage from '../../pages/public/PageNotFoundPage'
import ForgotPasswordPage from '../../pages/public/ForgotPasswordPage'

function AppRoutes() {
    const { user, loading } = useAuth()

    if (!loading) {
        return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<ConditionalRoute condition={user !== undefined} redirect="/" />}>
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/settings/:section" element={<SettingsPage />} />
                </Route>
                <Route element={<ConditionalRoute condition={user === undefined} redirect="/" />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
                </Route>
                <Route path="*" element={<PageNotFoundPage />} />
            </Routes>
        )
    }
}

export default AppRoutes
