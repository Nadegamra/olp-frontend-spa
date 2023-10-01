import {
    CourseRequirement,
    CourseRequirementCreateRequest,
    CourseRequirementDeleteRequest,
    CourseRequirementUpdateRequest
} from '../../dtos/CourseRequirement'
import apiSlice from './ApiSliceAuth'

const apiSliceCourseRequirements = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseRequirementList: builder.query<CourseRequirement[], number>({
            query: (courseId) => ({
                url: `https://localhost:44398/courses/${courseId}/requirements`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{ type: 'REQUIREMENT', id: arg }]
        }),
        addCourseRequirement: builder.mutation<undefined, CourseRequirementCreateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/requirements`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'REQUIREMENT', id: arg.courseId }]
        }),
        removeCourseRequirement: builder.mutation<undefined, CourseRequirementDeleteRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/requirements/${request.id}`,
                method: 'DELETE',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'REQUIREMENT', id: arg.courseId }]
        }),
        updateCourseRequirement: builder.mutation<undefined, CourseRequirementUpdateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/requirements/${request.id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'REQUIREMENT', id: arg.courseId }]
        })
    })
})

export default apiSliceCourseRequirements

export const {
    useGetCourseRequirementListQuery,
    useAddCourseRequirementMutation,
    useRemoveCourseRequirementMutation,
    useUpdateCourseRequirementMutation
} = apiSliceCourseRequirements
