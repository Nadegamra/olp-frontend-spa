import { create } from 'zustand'
// import useAuth from '../stores/AuthStore'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { sessionEnded } from '../features/auth/AuthSlice'

interface UsersState {
    changeEmail: (token: string) => Promise<boolean>
    changePassword: (token: string, newPassword: string) => Promise<boolean | string>
    confirmEmail: (token: string) => Promise<boolean>
    deleteUser: () => Promise<boolean>
    sendEmailChangeToken: (email: string) => Promise<boolean | string>
    sendPasswordResetToken: (email: string) => Promise<boolean>
    updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean | string>
}

const store = ({
    getAccessToken,
    logout,
    profile
}: {
    getAccessToken: () => Promise<string | undefined>
    logout: () => void
    profile: () => Promise<boolean>
}) =>
    create<UsersState>(() => {
        const api = axios.create({
            baseURL: 'https://localhost:44396/auth/'
        })

        let headers = {}
        getAccessToken().then((token) => {
            headers = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        return {
            changeEmail: async (token: string) => {
                try {
                    const res = await api.post('changeEmail', { token: token }, headers)
                    return res.status === 200
                } catch (err) {
                    return false
                }
            },
            changePassword: async (token: string, newPassword: string) => {
                try {
                    const res = await api.post(
                        'changePassword',
                        { token: token, newPassword: newPassword },
                        headers
                    )
                    return res.status === 200
                } catch (err: any) {
                    const errObj: object = err.response.data.errors
                    const errArr = Object.values(errObj).reduce((acc, curr) => {
                        return acc.concat(curr)
                    }, [])
                    return errArr.join('\n')
                }
            },
            confirmEmail: async (token: string) => {
                try {
                    const res = await api.post('confirmEmail', { token: token }, headers)
                    return res.status === 200
                } catch (err) {
                    return false
                }
            },
            deleteUser: async () => {
                try {
                    const res = await api.delete('deleteUser', headers)
                    if (res.status === 200) {
                        logout()
                    }
                    return res.status === 200
                } catch (err) {
                    return false
                }
            },
            sendEmailChangeToken: async (email: string) => {
                try {
                    const res = await api.post(
                        'sendEmailChangeToken',
                        { emailAddress: email },
                        headers
                    )
                    return res.status === 200
                } catch (err: any) {
                    const errObj: object = err.response.data.errors
                    const errArr = Object.values(errObj).reduce((acc, curr) => {
                        return acc.concat(curr)
                    }, [])
                    return errArr.join('\n')
                }
            },
            sendPasswordResetToken: async (email: string) => {
                try {
                    const res = await api.post(
                        'sendPasswordResetToken',
                        { emailAddress: email },
                        headers
                    )
                    return res.status === 200
                } catch (err) {
                    return false
                }
            },
            updatePassword: async (oldPassword: string, newPassword: string) => {
                try {
                    const res = await api.put(
                        'updatePassword',
                        { oldPassword: oldPassword, newPassword: newPassword },
                        headers
                    )
                    return res.status === 200
                } catch (err: any) {
                    const errObj: object = err.response.data.errors
                    const errArr = Object.values(errObj).reduce((acc, curr) => {
                        return acc.concat(curr)
                    }, [])
                    return errArr.join('\n')
                }
            }
        }
    })

export default function useUsers() {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.auth.accessToken)

    const logout = () => dispatch(sessionEnded(undefined))
    const profile = async () => {
        return true
    }
    const getAccessToken = async () => accessToken

    return store({ getAccessToken, logout, profile }).getState()
}
