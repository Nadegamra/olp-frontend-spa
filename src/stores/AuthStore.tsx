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
    role: string | undefined
    profile: (lazy?: boolean) => Promise<boolean>
    login: (data: LoginRequestDTO) => Promise<boolean | string>
    refresh: () => Promise<boolean>
    register: (data: RegisterDTO) => Promise<boolean | string>
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
    let user: User | undefined
    let role: string | undefined
    ;(() => {
        accessToken = localStorage.getItem('accessToken') ?? undefined
        refreshToken = localStorage.getItem('refreshToken') ?? undefined
        accessExp = accessToken !== undefined ? getExpirationDate(accessToken) : undefined
        userId = localStorage.getItem('userId') ?? undefined
        user =
            localStorage.getItem('user') !== null
                ? JSON.parse(localStorage.getItem('user')!)
                : undefined
        role = localStorage.getItem('role') ?? undefined
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

    const clearLoginInfo = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        accessToken = undefined
        refreshToken = undefined
        accessExp = undefined
        userId = undefined
        user = undefined
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
        try {
            const res = await api.post(
                'refresh-token',
                new RenewTokenRequestDTO(userId, refreshToken)
            )
            if (res.status === 200) {
                saveLoginInfo(res.data as LoginResponseDTO)
                profile().finally(() => {
                    return true
                })
            }
        } catch (err: any) {
            clearLoginInfo()
            set(() => ({ loading: false }))
        }
        return false
    }
    const profile = async (lazy = false): Promise<boolean> => {
        if (isTokenExpired()) {
            const res = await refresh()
            if (!res) {
                return false
            }
        }
        if (lazy && user !== undefined) {
            set((state) => ({ stateNumber: state?.stateNumber + 1 }))
            return true
        }
        const res = await api.get('profile', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        if (res.status === 200) {
            const data = res.data as User
            set((state) => ({ user: data, stateNumber: state.stateNumber + 1 }))
            user = data
            localStorage.setItem('user', JSON.stringify(data))
            if (accessToken === undefined) {
                return false
            }
            const parts = accessToken.split('.')
            const payload = JSON.parse(window.atob(parts[1]))
            localStorage.setItem('role', payload.role)
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
        user: user,
        role: role,
        stateNumber: 0,
        profile: profile,
        login: async (dto: LoginRequestDTO): Promise<boolean> => {
            try {
                const res = await api.post('login', dto)
                if (res.status === 200) {
                    saveLoginInfo(res.data as LoginResponseDTO)
                    profile().finally(() => {
                        return true
                    })
                }
                return false
            } catch (err: any) {
                const errObj: object = err.response.data.errors
                const errArr = Object.values(errObj).reduce((acc, curr) => {
                    return acc.concat(curr)
                }, [])
                return errArr.join('\n')
            }
        },
        refresh: refresh,
        register: async (dto: RegisterDTO): Promise<boolean> => {
            try {
                const res = await api.post('register', {
                    email: dto.email,
                    password: dto.password,
                    role: dto.role
                })
                return res.status === 200
            } catch (err: any) {
                const errObj: object = err.response.data.errors
                const errArr = Object.values(errObj).reduce((acc, curr) => {
                    return acc.concat(curr)
                }, [])
                return errArr.join('\n')
            }
        },
        isTokenExpired: isTokenExpired,
        logout: () => {
            clearLoginInfo()
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
        }
    }
})

export default useAuth
