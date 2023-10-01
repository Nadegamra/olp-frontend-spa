import {
    CourseLanguage,
    CourseLanguageCreateRequest,
    CourseLanguageDeleteRequest,
    CourseLanguageSetPrimaryRequest
} from '../../dtos/CourseLanguage'
import apiSlice from './ApiSliceAuth'

const apiSliceCourseLanguages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCourseLanguage: builder.mutation<undefined, CourseLanguageCreateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/languages`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'COURSE_LANGUAGE', id: arg.courseId }]
        }),
        removeCourseLanguage: builder.mutation<undefined, CourseLanguageDeleteRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/languages/${request.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'COURSE_LANGUAGE', id: arg.courseId }]
        }),
        setCoursePrimaryLanguage: builder.mutation<undefined, CourseLanguageSetPrimaryRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/languages/${request.id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'COURSE_LANGUAGE', id: arg.courseId }]
        }),
        getCourseLanguageList: builder.query<CourseLanguage[], number>({
            query: (courseId) => ({
                url: `https://localhost:44398/courses/${courseId}/languages`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{ type: 'COURSE_LANGUAGE', id: arg }]
        })
    })
})

export default apiSliceCourseLanguages

export const {
    useAddCourseLanguageMutation,
    useRemoveCourseLanguageMutation,
    useSetCoursePrimaryLanguageMutation,
    useGetCourseLanguageListQuery
} = apiSliceCourseLanguages
