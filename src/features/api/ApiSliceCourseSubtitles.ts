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
                url: `/courses/${request.courseId}/subtitles`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: 'COURSE_SUBTITLE', id: arg.courseId }
            ]
        }),
        removeCourseSubtitle: builder.mutation<undefined, CourseSubtitleDeleteRequest>({
            query: (request) => ({
                url: `/courses/${request.courseId}/subtitles/${request.id}`,
                method: 'DELETE',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: 'COURSE_SUBTITLE', id: arg.courseId }
            ]
        }),
        getCourseSubtitleList: builder.query<CourseSubtitle[], number>({
            query: (courseId) => ({
                url: `/courses/${courseId}/subtitles`,
                method: 'GET'
            }),
            providesTags: (_result, _error, arg) => [{ type: 'COURSE_SUBTITLE', id: arg }]
        })
    })
})

export default apiSliceCourseSubtitles

export const {
    useAddCourseSubtitleMutation,
    useRemoveCourseSubtitleMutation,
    useGetCourseSubtitleListQuery
} = apiSliceCourseSubtitles
