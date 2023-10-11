import { Section, SectionAddRequest, SectionUpdateRequest } from '../../dtos/Section'
import apiSlice from './ApiSliceAuth'

const apiSliceSections = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSectionList: builder.query<Section[], number>({
            query: (courseId) => ({
                url: `https://localhost:44340/courses/${courseId}/sections`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{ type: 'SECTION', id: arg }]
        }),
        getSection: builder.query<Section[], [number, number]>({
            query: ([courseId, sectionId]) => ({
                url: `https://localhost:44340/courses/${courseId}/sections/${sectionId}`,
                method: 'GET'
            })
        }),
        addSection: builder.mutation<Section, [number, SectionAddRequest]>({
            query: ([courseId, request]) => ({
                url: `https://localhost:44340/courses/${courseId}/sections`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'SECTION', id: arg[0] }]
        }),
        updateSection: builder.mutation<Section, [number, number, SectionUpdateRequest]>({
            query: ([courseId, id, request]) => ({
                url: `https://localhost:44340/courses/${courseId}/sections/${id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'SECTION', id: arg[0] }]
        }),
        deleteSection: builder.mutation<Section, [number, number]>({
            query: ([courseId, id]) => ({
                url: `https://localhost:44340/courses/${courseId}/sections/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'SECTION', id: arg[0] }]
        })
    })
})

export default apiSliceSections

export const {
    useGetSectionListQuery,
    useGetSectionQuery,
    useAddSectionMutation,
    useUpdateSectionMutation,
    useDeleteSectionMutation
} = apiSliceSections
