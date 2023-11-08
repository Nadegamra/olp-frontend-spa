import {
    CourseCountGetResponse,
    CourseCreateRequest,
    CourseGetListRequest,
    CourseResponse,
    CourseResponseOwner,
    CourseUpdateRequest
} from '../../dtos/Course'
import apiSlice from './ApiSliceAuth'

const apiSliceCourses = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createCourse: build.mutation<CourseResponse, CourseCreateRequest>({
            query: (request) => ({
                url: '/courses',
                body: JSON.stringify(request),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        deleteCourse: build.mutation<boolean, number>({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'COURSE', id: arg }]
        }),
        getCourse: build.query<CourseResponse, number>({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'GET'
            }),
            providesTags: (_result, _error, arg) => [{ type: 'COURSE', id: arg }]
        }),
        getCourseList: build.query<CourseResponse[], CourseGetListRequest>({
            query: (request) => ({
                url: `/courses?phrase=${request.phrase}&skip=${request.skip}&take=${request.take}`,
                method: 'GET'
            }),
            providesTags: (result, _error, _arg) =>
                result ? [...result.map(({ id }) => ({ type: 'COURSE' as const, id }))] : ['COURSE']
        }),
        getUserCourse: build.query<CourseResponseOwner, number>({
            query: (id) => ({
                url: `/courses/owned/${id}`,
                method: 'GET'
            }),
            providesTags: (_result, _error, arg) => [{ type: 'COURSE', id: arg }]
        }),
        updateCourse: build.mutation<CourseResponseOwner, { request: CourseUpdateRequest }>({
            query: ({ request }) => ({
                url: `/courses/${request.id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'COURSE', id: arg.request.id }]
        }),
        getCourseCount: build.query<CourseCountGetResponse, CourseGetListRequest>({
            query: (request) => ({
                url: `/courses/count?phrase=${request.phrase}&skip=${request.skip}&take=${request.take}`,
                method: 'GET'
            })
        })
    })
})

export default apiSliceCourses

export const {
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useGetCourseQuery,
    useGetCourseListQuery,
    useUpdateCourseMutation,
    useGetCourseCountQuery
} = apiSliceCourses
