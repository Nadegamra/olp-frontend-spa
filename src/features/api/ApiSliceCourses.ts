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
                url: 'https://localhost:44398/courses',
                body: JSON.stringify(request),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        deleteCourse: build.mutation<boolean, number>({
            query: (id) => ({
                url: `https://localhost:44398/courses/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'COURSE', id: arg }]
        }),
        getCourse: build.query<CourseResponse, number>({
            query: (id) => ({
                url: `https//localhost:44398/courses/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{ type: 'COURSE', id: arg }]
        }),
        getCourseList: build.query<CourseResponse[], CourseGetListRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses?phrase=${request.phrase}&skip=${request.skip}&take=${request.take}`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.map(({ id }) => ({ type: 'COURSE' as const, id }))] : ['COURSE']
        }),
        getUserCourse: build.query<CourseResponseOwner, number>({
            query: (id) => ({
                url: `https://localhost:44398/courses/owned/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{ type: 'COURSE', id: arg }]
        }),
        getUserCourseList: build.query<CourseResponseOwner[], CourseGetListRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/owned?phrase=${request.phrase}&skip=${request.skip}&take=${request.take}`,
                method: 'GET'
            }),
            transformResponse: (response: { items: CourseResponseOwner[] }, meta, arg) => {
                return response.items
            },
            providesTags: (result, error, arg) =>
                result ? [...result.map(({ id }) => ({ type: 'COURSE' as const, id }))] : ['COURSE']
        }),
        updateCourse: build.mutation<CourseResponseOwner, { request: CourseUpdateRequest }>({
            query: ({ request }) => ({
                url: `https://localhost:44398/courses/${request.id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'COURSE', id: arg.request.id }]
        }),
        getCourseCount: build.query<CourseCountGetResponse, CourseGetListRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/count?phrase=${request.phrase}&skip=${request.skip}&take=${request.take}`,
                method: 'GET'
            })
        }),
        getUserCourseCount: build.query<CourseCountGetResponse, CourseGetListRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/owned/count?phrase=${request.phrase}&skip=${request.skip}&take=${request.take}`,
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
    useGetUserCourseQuery,
    useGetUserCourseListQuery,
    useUpdateCourseMutation,
    useGetCourseCountQuery,
    useGetUserCourseCountQuery
} = apiSliceCourses
