import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import {
    LoginRequestDTO,
    LoginResponseDTO,
    RegisterDTO,
    RenewTokenRequestDTO,
    User
} from '../../dtos/User'
import { sessionEnded, sessionRefreshed } from '../auth/AuthSlice'
import { RootState } from '../../app/Store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:44396',
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.accessToken

        if (token !== undefined) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    }
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    await api.dispatch(apiSlice.endpoints.profile.initiate(undefined))
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const { user, refreshToken } = (api.getState() as RootState).auth
        const refreshResult = await baseQuery(
            {
                url: 'auth/refresh-token',
                body: JSON.stringify(
                    new RenewTokenRequestDTO(user?.id.toString() ?? '', refreshToken ?? '')
                ),
                method: 'POST'
            },
            api,
            extraOptions
        )
        if (refreshResult.data !== undefined) {
            api.dispatch(sessionRefreshed(refreshResult.data as LoginResponseDTO))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(sessionEnded(undefined))
        }
    }
    return result
}

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['PROFILE'],
    endpoints: (builder) => ({
        refreshToken: builder.mutation<LoginResponseDTO, RenewTokenRequestDTO>({
            query: (request: RenewTokenRequestDTO) => ({
                url: 'auth/refresh-token',
                body: request
            })
        }),
        profile: builder.query<User, undefined>({
            query: () => ({ url: 'auth/profile' }),
            providesTags: ['PROFILE']
        }),
        login: builder.mutation<LoginResponseDTO, LoginRequestDTO>({
            query: (request: LoginRequestDTO) => ({
                url: '/auth/login',
                body: JSON.stringify(request),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['PROFILE']
        }),
        register: builder.mutation<undefined, RegisterDTO>({
            query: (request: RegisterDTO) => ({
                url: '/auth/register',
                body: request,
                method: 'POST'
            })
        })
    })
})

export default apiSlice

export const { useLoginMutation, useProfileQuery, useRefreshTokenMutation, useRegisterMutation } =
    apiSlice
