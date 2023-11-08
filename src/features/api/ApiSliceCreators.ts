import { CreatorResponse, CreatorUpdateRequest } from '../../dtos/Creator'
import apiSlice from './ApiSliceAuth'

const apiSliceCreators = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateCreator: builder.mutation<undefined, CreatorUpdateRequest>({
            query: (request) => ({
                url: `/creator`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['CREATOR']
        }),
        getCreatorProfile: builder.query<CreatorResponse, undefined>({
            query: () => ({
                url: `/creator`,
                method: 'GET'
            }),
            providesTags: ['CREATOR']
        }),
        getCreatorProfileAnonymous: builder.query<CreatorResponse, number>({
            query: (userId) => ({
                url: `/creator/${userId}`,
                method: 'GET'
            }),
            providesTags: (_result, _error, arg) => [{ type: 'CREATOR', id: arg }]
        })
    })
})

export default apiSliceCreators

export const {
    useUpdateCreatorMutation,
    useGetCreatorProfileQuery,
    useGetCreatorProfileAnonymousQuery
} = apiSliceCreators
