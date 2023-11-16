import apiSlice from './ApiSliceAuth'

const apiSliceUsers = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        changeEmail: build.mutation<undefined, string>({
            query: (token: string) => ({
                url: '/auth/changeEmail',
                body: JSON.stringify({ token }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['PROFILE']
        }),
        changePassword: build.mutation<object, { token: string; newPassword: string }>({
            query: ({ token, newPassword }) => ({
                url: '/auth/changePassword',
                body: JSON.stringify({ token, newPassword }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        confirmEmail: build.mutation<undefined, string>({
            query: (token: string) => ({
                url: '/auth/confirmEmail',
                body: JSON.stringify({ token }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['PROFILE']
        }),
        deleteUser: build.mutation<undefined, undefined>({
            query: () => ({
                url: '/auth/deleteUser',
                method: 'DELETE'
            }),
            invalidatesTags: ['PROFILE']
        }),
        sendEmailChangeToken: build.mutation<undefined, string>({
            query: (email: string) => ({
                url: '/auth/sendEmailChangeToken',
                body: JSON.stringify({ emailAddress: email }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        sendPasswordResetToken: build.mutation<undefined, string>({
            query: (email: string) => ({
                url: '/auth/sendPasswordResetToken',
                body: JSON.stringify({ emailAddress: email }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        updatePassword: build.mutation<undefined, { oldPassword: string; newPassword: string }>({
            query: ({ oldPassword, newPassword }) => ({
                url: '/auth/updatePassword',
                body: JSON.stringify({ oldPassword, newPassword }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['PROFILE']
        }),
        updateUsername: build.mutation<undefined, string>({
            query: (newUsername: string) => ({
                url: '/auth/updateUsername',
                body: JSON.stringify({ newUsername }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['PROFILE']
        })
    })
})

export default apiSliceUsers

export const {
    useChangeEmailMutation,
    useChangePasswordMutation,
    useConfirmEmailMutation,
    useDeleteUserMutation,
    useSendEmailChangeTokenMutation,
    useSendPasswordResetTokenMutation,
    useUpdatePasswordMutation,
    useUpdateUsernameMutation
} = apiSliceUsers
