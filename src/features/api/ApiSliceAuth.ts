import { createApi } from '@reduxjs/toolkit/query/react'
import { LoginRequestDTO, LoginResponseDTO, RegisterDTO, User } from '../../dtos/User'
import baseQueryWithReauth from './baseQueryWithReauth'

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['PROFILE', 'SKILL', 'COURSE'],
    refetchOnFocus: true,
    endpoints: (builder) => ({
        profile: builder.query<User, undefined>({
            query: () => ({ url: 'https://localhost:44396/auth/profile' }),
            providesTags: ['PROFILE']
        }),
        login: builder.mutation<LoginResponseDTO, LoginRequestDTO>({
            query: (request: LoginRequestDTO) => ({
                url: 'https://localhost:44396/auth/login',
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
                url: 'https://localhost:44396/auth/register',
                body: request,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
})

export default apiSlice

export const { useLoginMutation, useProfileQuery, useRegisterMutation } = apiSlice
