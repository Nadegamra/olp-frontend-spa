import { create } from 'zustand'
import {
    LoginRequestDTO,
    LoginResponseDTO,
    RegisterDTO,
    RenewTokenRequestDTO,
    User
} from '../dtos/User'
import axios from 'axios'

interface AuthState {
    loading: boolean
    user: User | undefined
    profile: () => Promise<boolean>
    getRole: () => string
    login: (data: LoginRequestDTO) => Promise<boolean>
    refresh: () => Promise<boolean>
    register: (data: RegisterDTO) => Promise<boolean>
    isTokenExpired: () => boolean
    logout: () => void
    getAccessToken: () => Promise<string | undefined>
    stateNumber: number
}

const api = axios.create({
    baseURL: 'https://localhost:44396/auth/'
})

const getExpirationDate = (accessToken: string): Date => {
    const parts = accessToken.split('.')
    const payload = JSON.parse(window.atob(parts[1]))
    return new Date(payload.exp * 1000)
}

const useAuth = create<AuthState>()((set, get) => {
    let accessToken: string | undefined
    let refreshToken: string | undefined
    let accessExp: Date | undefined
    let userId: string | undefined
    ;(() => {
        accessToken = localStorage.getItem('accessToken') ?? undefined
        refreshToken = localStorage.getItem('refreshToken') ?? undefined
        accessExp = accessToken !== undefined ? getExpirationDate(accessToken) : undefined
        userId = localStorage.getItem('userId') ?? undefined
    })()

    const saveLoginInfo = (data: LoginResponseDTO) => {
        accessToken = data.accessToken
        refreshToken = data.refreshToken
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        accessExp = getExpirationDate(accessToken)
        userId = data.userId
        localStorage.setItem('userId', data.userId)
    }

    const isTokenExpired = (): boolean => {
        if (accessExp === undefined) {
            return true
        }
        return accessExp !== undefined && accessExp < new Date()
    }

    const refresh = async (): Promise<boolean> => {
        if (userId === undefined || refreshToken === undefined) {
            return false
        }
        const res = await api.post('refresh-token', new RenewTokenRequestDTO(userId, refreshToken))
        if (res.status === 200) {
            saveLoginInfo(res.data as LoginResponseDTO)
            profile().finally(() => {
                return true
            })
        }
        return false
    }
    const profile = async (): Promise<boolean> => {
        if (isTokenExpired()) {
            const res = await refresh()
            if (!res) {
                return false
            }
        }
        const res = await api.get('profile', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        if (res.status === 200) {
            const data = res.data as User
            set((state) => ({ user: data, stateNumber: state.stateNumber + 1 }))
            return true
        } else {
            return false
        }
    }

    ;(async () => {
        await profile()
        set(() => ({ loading: false }))
    })()

    return {
        loading: true,
        user: undefined,
        stateNumber: 0,
        profile: profile,
        login: async (dto: LoginRequestDTO): Promise<boolean> => {
            const res = await api.post('login', dto)
            if (res.status === 200) {
                saveLoginInfo(res.data as LoginResponseDTO)
                profile().finally(() => {
                    return true
                })
            }
            return false
        },
        refresh: refresh,
        register: async (dto: RegisterDTO): Promise<boolean> => {
            const res = await api.post('register', dto)
            return res.status === 200
        },
        isTokenExpired: isTokenExpired,
        logout: () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userId')
            accessToken = undefined
            refreshToken = undefined
            accessExp = undefined
            userId = undefined
            set((state) => ({ stateNumber: state.stateNumber + 1, user: undefined }))
        },
        getAccessToken: async (): Promise<string | undefined> => {
            if (isTokenExpired()) {
                const refreshSucceeded = await refresh()
                if (refreshSucceeded) {
                    return accessToken
                }
                return undefined
            }
            return accessToken
        },
        getRole: (): string => {
            if (accessToken === undefined) {
                return ''
            }
            const parts = accessToken.split('.')
            const payload = JSON.parse(window.atob(parts[1]))
            return payload.role
        }
    }
})

export default useAuth
