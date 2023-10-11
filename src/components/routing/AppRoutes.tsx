import { Route, Routes } from 'react-router-dom'
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
import SkillsListPage from '../../pages/admin/SkillsListPage'
import LanguageListPage from '../../pages/admin/LanguageListPage'
import CoursesPage from '../../pages/public/CoursesPage'
import CoursePage from '../../pages/public/CoursePage'
import MyCoursePage from '../../pages/creator/MyCoursePage'

function AppRoutes() {
    const { user, role } = useAppSelector((state) => state.auth)
    return (
        <Routes>
            <Route path="/" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CoursePage />} />
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

                <Route path="/myCourses/:id/" element={<MyCoursePage />} />
                <Route path="/myCourses/:id/:section" element={<MyCoursePage />} />
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
