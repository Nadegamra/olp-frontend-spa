import { createApi } from '@reduxjs/toolkit/query/react'
import { LoginRequestDTO, LoginResponseDTO, RegisterDTO, User } from '../../dtos/User'
import baseQueryWithReauth from './baseQueryWithReauth'

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'PROFILE',
        'CREATOR',
        'SKILL',
        'COURSE',
        'LANGUAGE',
        'IMAGE',
        'COURSE_LANGUAGE',
        'COURSE_SUBTITLE',
        'REQUIREMENT',
        'GAINED_SKILL',
        'SECTION',
        'INFO_PAGE'
    ],
    refetchOnFocus: true,
    endpoints: (builder) => ({
        profile: builder.query<User, undefined>({
            query: () => ({ url: '/auth/profile' }),
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
                body: JSON.stringify(request),
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
