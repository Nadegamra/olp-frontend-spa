import { InfoPage, InfoPageAddRequest, InfoPageUpdateRequest } from '../../dtos/InfoPage'
import apiSlice from './ApiSliceAuth'

const apiSliceInfoPages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInfoPageList: builder.query<InfoPage[], [number, number]>({
            query: ([courseId, sectionId]) => ({
                url: `/courses/${courseId}/sections/${sectionId}/infoPages`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{ type: 'INFO_PAGE', id: arg[1] }]
        }),
        getInfoPage: builder.query<InfoPage, [number, number, number]>({
            query: ([courseId, sectionId, id]) => ({
                url: `/courses/${courseId}/sections/${sectionId}/infoPages/${id}`,
                method: 'GET'
            })
        }),
        addInfoPage: builder.mutation<InfoPage, [number, number, InfoPageAddRequest]>({
            query: ([courseId, sectionId, request]) => ({
                url: `/courses/${courseId}/sections/${sectionId}/infoPages`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'INFO_PAGE', id: arg[1] }]
        }),
        updateInfoPage: builder.mutation<InfoPage, [number, number, number, InfoPageUpdateRequest]>(
            {
                query: ([courseId, sectionId, id, request]) => ({
                    url: `/courses/${courseId}/sections/${sectionId}/infoPages/${id}`,
                    method: 'PUT',
                    body: JSON.stringify(request),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                async onQueryStarted(
                    [courseId, sectionId, id, request],
                    { dispatch, queryFulfilled }
                ) {
                    const result = dispatch(
                        apiSliceInfoPages.util.updateQueryData(
                            'getInfoPageList',
                            [courseId, sectionId],
                            (infoPages) => {
                                const idx = infoPages.findIndex((x) => x.id === id)
                                infoPages[idx] = { ...infoPages[idx], ...request }
                            }
                        )
                    )
                    try {
                        await queryFulfilled
                    } catch {
                        result.undo()
                    }
                },
                invalidatesTags: (result, error, arg) => [{ type: 'INFO_PAGE', id: arg[1] }]
            }
        ),
        deleteInfoPage: builder.mutation<InfoPage, [number, number, number]>({
            query: ([courseId, sectionId, id]) => ({
                url: `/courses/${courseId}/sections/${sectionId}/infoPages/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted([courseId, sectionId, id], { dispatch, queryFulfilled }) {
                const result = dispatch(
                    apiSliceInfoPages.util.updateQueryData(
                        'getInfoPageList',
                        [courseId, sectionId],
                        (infoPages) => {
                            infoPages = infoPages.filter((x) => x.id !== id)
                        }
                    )
                )
                try {
                    await queryFulfilled
                } catch {
                    result.undo()
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'INFO_PAGE', id: arg[1] }]
        })
    })
})

export default apiSliceInfoPages

export const {
    useGetInfoPageListQuery,
    useGetInfoPageQuery,
    useAddInfoPageMutation,
    useUpdateInfoPageMutation,
    useDeleteInfoPageMutation
} = apiSliceInfoPages
