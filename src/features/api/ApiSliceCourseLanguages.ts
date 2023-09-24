import { CourseLanguageCreateRequest, CourseLanguageDeleteRequest } from '../../dtos/CourseLanguage'
import apiSlice from './ApiSliceAuth'

const apiSliceCourseLanguages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCourseLanguage: builder.mutation<undefined, CourseLanguageCreateRequest>({
            query: (request) => ({
                url: `https//localhost:44398/courses/${request.courseId}/languages`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        removeCourseLanguage: builder.mutation<undefined, CourseLanguageDeleteRequest>({
            query: (request) => ({
                url: `https//localhost:44398/courses/${request.courseId}/languages/${request.id}`,
                method: 'DELETE',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
})

export default apiSliceCourseLanguages

export const { useAddCourseLanguageMutation, useRemoveCourseLanguageMutation } =
    apiSliceCourseLanguages