import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../dtos/User'
import apiSlice from '../api/ApiSliceAuth'
import apiSliceUsers from '../api/ApiSliceUsers'

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
        sessionRefreshed: (state, { payload }) => {
            state.accessToken = payload.accessToken
            localStorage.setItem('accessToken', payload.accessToken)
            state.refreshToken = payload.refreshToken
            localStorage.setItem('refreshToken', payload.refreshToken)
            const parts = payload.accessToken.split('.')
            const tokenContents = JSON.parse(window.atob(parts[1]))
            state.role = tokenContents.role
            localStorage.setItem('role', tokenContents.role)
        }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken
            localStorage.setItem('accessToken', payload.accessToken)
            state.refreshToken = payload.refreshToken
            localStorage.setItem('refreshToken', payload.refreshToken)
            const parts = payload.accessToken.split('.')
            const tokenContents = JSON.parse(window.atob(parts[1]))
            state.role = tokenContents.role
            localStorage.setItem('role', tokenContents.role)
        }),
            builder.addMatcher(apiSlice.endpoints.profile.matchFulfilled, (state, { payload }) => {
                state.user = payload
                localStorage.setItem('user', JSON.stringify(payload))
            }),
            builder.addMatcher(
                apiSliceUsers.endpoints.updateUsername.matchFulfilled,
                (
                    state,
                    {
                        meta: {
                            arg: { originalArgs }
                        }
                    }
                ) => {
                    state.user!.username = originalArgs
                    localStorage.setItem('user', JSON.stringify(state.user))
                }
            )
    }
})

export default authSlice.reducer

export const { sessionEnded, sessionRefreshed } = authSlice.actions
