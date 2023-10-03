import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/public/HomePage'
import SettingsPage from '../../pages/user/SettingsPage'
import ConditionalRoute from './ConditionalRoute'
import LoginPage from '../../pages/public/LoginPage'
import RegisterPage from '../../pages/public/RegisterPage'
import PageNotFoundPage from '../../pages/public/PageNotFoundPage'
import ForgotPasswordPage from '../../pages/public/ForgotPasswordPage'
import ChangeEmailPage from '../../pages/public/ChangeEmailPage'
import ChangePasswordPage from '../../pages/public/ChangePasswordPage'
import ConfirmEmailPage from '../../pages/public/ConfirmEmailPage'
import CreateCoursePage from '../../pages/creator/CreateCoursePage'
import { useAppSelector } from '../../app/hooks'
import MyCoursesPage from '../../pages/creator/MyCoursesPage'
import MyCourseEditPage from '../../pages/creator/MyCourseEditPage'
import SkillsListPage from '../../pages/admin/SkillsListPage'
import LanguageListPage from '../../pages/admin/LanguageListPage'

function AppRoutes() {
    const { user, role } = useAppSelector((state) => state.auth)
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/changeEmail/:token" element={<ChangeEmailPage />} />
            <Route element={<ConditionalRoute condition={user !== undefined} redirect="/" />}>
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/:section" element={<SettingsPage />} />
            </Route>
            <Route element={<ConditionalRoute condition={user === undefined} redirect="/" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
                <Route path="/changePassword/:token" element={<ChangePasswordPage />} />
                <Route path="/confirmEmail/:token" element={<ConfirmEmailPage />} />
            </Route>
            <Route
                element={
                    <ConditionalRoute
                        condition={user !== undefined && role === 'CREATOR'}
                        redirect="/"
                    />
                }>
                <Route path="/addCourse" element={<CreateCoursePage />} />
                <Route path="/myCourses" element={<MyCoursesPage />} />

                <Route path="/myCourses/:id/" element={<MyCourseEditPage />} />
                <Route path="/myCourses/:id/:section" element={<MyCourseEditPage />} />
            </Route>
            <Route
                element={<ConditionalRoute condition={user !== undefined && role === 'ADMIN'} />}>
                <Route path="/skills" element={<SkillsListPage />} />
                <Route path="/languages" element={<LanguageListPage />} />
            </Route>
            <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes
