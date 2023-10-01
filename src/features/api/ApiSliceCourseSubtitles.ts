import {
    CourseSubtitle,
    CourseSubtitleCreateRequest,
    CourseSubtitleDeleteRequest
} from '../../dtos/CourseSubtitle'
import apiSlice from './ApiSliceAuth'

const apiSliceCourseSubtitles = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCourseSubtitle: builder.mutation<undefined, CourseSubtitleCreateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/subtitles`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'COURSE_SUBTITLE', id: arg.courseId }]
        }),
        removeCourseSubtitle: builder.mutation<undefined, CourseSubtitleDeleteRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/subtitles/${request.id}`,
                method: 'DELETE',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'COURSE_SUBTITLE', id: arg.courseId }]
        }),
        getCourseSubtitleList: builder.query<CourseSubtitle[], number>({
            query: (courseId) => ({
                url: `https://localhost:44398/courses/${courseId}/subtitles`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{ type: 'COURSE_SUBTITLE', id: arg }]
        })
    })
})

export default apiSliceCourseSubtitles

export const {
    useAddCourseSubtitleMutation,
    useRemoveCourseSubtitleMutation,
    useGetCourseSubtitleListQuery
} = apiSliceCourseSubtitles
