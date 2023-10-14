import {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../../app/store'
import { LoginResponseDTO, RenewTokenRequestDTO } from '../../dtos/User'
import { sessionEnded, sessionRefreshed } from '../auth/AuthSlice'
import apiSlice from './ApiSliceAuth'
import { isAuthTokenExpired } from '../auth/endSessionIfExpired'

const baseQuery = fetchBaseQuery({
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
    if (isAuthTokenExpired()) {
        console.log('text')
        await refreshSession(args, api, extraOptions)
    }

    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        await refreshSession(args, api, extraOptions)
        result = await baseQuery(args, api, extraOptions)
    }
    return result
}

const refreshSession = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const { user, refreshToken } = (api.getState() as RootState).auth
    const refreshResult = await baseQuery(
        {
            url: 'https://localhost:44396/auth/refresh-token',
            body: JSON.stringify(
                new RenewTokenRequestDTO(user?.id.toString() ?? '', refreshToken ?? '')
            ),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        api,
        extraOptions
    )
    if (refreshResult.data !== undefined) {
        api.dispatch(sessionRefreshed(refreshResult.data as LoginResponseDTO))
        api.dispatch(apiSlice.endpoints.profile.initiate(undefined))
    } else {
        api.dispatch(sessionEnded(undefined))
    }
}

export default baseQueryWithReauth
