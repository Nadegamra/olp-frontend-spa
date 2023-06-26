import { create } from 'zustand'
import useAuth from '../stores/AuthStore'
import axios from 'axios'

interface UsersState {
    changeEmail: (token: string) => Promise<boolean>
    changePassword: (token: string, newPassword: string) => Promise<boolean>
    confirmEmail: (token: string) => Promise<boolean>
    deleteUser: () => Promise<boolean>
    sendEmailChangeToken: (email: string) => Promise<boolean>
    sendPasswordResetToken: (email: string) => Promise<boolean>
    updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>
    updateUsername: (newUsername: string) => Promise<boolean>
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
                } catch (err) {
                    return false
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
                } catch (err) {
                    return false
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
                } catch (err) {
                    return false
                }
            },
            updateUsername: async (newUsername: string) => {
                try {
                    const res = await api.put(
                        'updateUsername',
                        { newUsername: newUsername },
                        headers
                    )
                    await profile()
                    return res.status === 200
                } catch (err) {
                    return false
                }
            }
        }
    })

export default function useUsers() {
    const { getAccessToken, logout, profile } = useAuth()

    return store({ getAccessToken, logout, profile }).getState()
}
