import { Navigate, Outlet } from 'react-router-dom'
import PageNotFoundPage from '../../pages/public/PageNotFoundPage'

function ProtectedRoute({ condition, redirect = '' }: { condition: boolean; redirect?: string }) {
    return condition ? (
        <Outlet />
    ) : redirect === '' ? (
        <PageNotFoundPage />
    ) : (
        <Navigate to={redirect} />
    )
}

export default ProtectedRoute
