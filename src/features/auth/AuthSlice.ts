import { createSlice } from '@reduxjs/toolkit'
import { LoginResponseDTO, User } from '../../dtos/User'

interface AuthState {
    user: User | undefined
    role: string | undefined
    accessToken: string | undefined
    refreshToken: string | undefined
}

const initialState: AuthState = {
    user:
        localStorage.getItem('user') !== null
            ? JSON.parse(localStorage.getItem('user')!)
            : undefined,
    role: localStorage.getItem('role') ?? '',
    accessToken: localStorage.getItem('accessToken') ?? '',
    refreshToken: localStorage.getItem('refreshToken') ?? ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        sessionEnded: (state, action) => {
            state.user = undefined
            localStorage.removeItem('user')
            state.role = undefined
            localStorage.removeItem('role')
            state.accessToken = undefined
            localStorage.removeItem('accessToken')
            state.refreshToken = undefined
            localStorage.removeItem('refreshToken')
        },
        sessionRefreshed: (state, action: { payload: LoginResponseDTO }) => {
            state.accessToken = action.payload.accessToken
            localStorage.setItem('accessToken', action.payload.accessToken)
            state.refreshToken = action.payload.refreshToken
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            const parts = action.payload.accessToken.split('.')
            const tokenContents = JSON.parse(window.atob(parts[1]))
            state.role = tokenContents.role
            localStorage.setItem('role', tokenContents.role)
        },
        personalDataFetched: (state, action: { payload: User }) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        }
    }
})

export default authSlice.reducer

export const { sessionRefreshed, sessionEnded, personalDataFetched } = authSlice.actions
