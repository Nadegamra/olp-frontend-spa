import { CreatorUpdateRequest } from '../../dtos/Creator'
import { User } from '../../dtos/User'
import apiSlice from './ApiSliceAuth'

const apiSliceCreators = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateCreator: builder.mutation<undefined, CreatorUpdateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/creator`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['CREATOR']
        }),
        getCreatorProfile: builder.query<User, undefined>({
            query: () => ({
                url: `https://localhost:44398`,
                method: 'GET'
            }),
            providesTags: ['CREATOR']
        })
    })
})

export default apiSliceCreators

export const { useUpdateCreatorMutation, useGetCreatorProfileQuery } = apiSliceCreators
