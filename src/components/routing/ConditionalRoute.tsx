import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ condition, redirect }: { condition: boolean; redirect: string }) {
    return condition ? <Outlet /> : <Navigate to={redirect} />
}

export default ProtectedRoute
