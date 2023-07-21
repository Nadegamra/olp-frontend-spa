import {
    CourseCreateRequest,
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
            })
        }),
        getCourse: build.query<CourseResponse, number>({
            query: (id) => ({
                url: `https//localhost:44398/courses/${id}`,
                method: 'GET'
            })
        }),
        getCourseList: build.query<CourseResponse[], undefined>({
            query: () => ({
                url: `https://localhost:44398/courses`,
                method: 'GET'
            })
        }),
        getUserCourse: build.query<CourseResponseOwner, number>({
            query: (id) => ({
                url: `https://localhost:44398/courses/owned/${id}`,
                method: 'GET'
            })
        }),
        getUserCourseList: build.query<CourseResponseOwner[], undefined>({
            query: () => ({
                url: `https://localhost:44398/courses/owned`,
                method: 'GET'
            })
        }),
        updateCourse: build.mutation<
            CourseResponseOwner,
            { id: number; request: CourseUpdateRequest }
        >({
            query: ({ id, request }) => ({
                url: `https://localhost:44398/courses/${id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
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
    useUpdateCourseMutation
} = apiSliceCourses
