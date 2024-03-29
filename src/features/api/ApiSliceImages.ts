import { SetCourseImageRequest } from '../../dtos/CourseImage'
import apiSlice from './ApiSliceAuth'

const apiSliceImages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setCourseImage: builder.mutation<undefined, SetCourseImageRequest>({
            query: (request) => ({
                url: `/courses/${request.courseId}/image`,
                method: 'PUT',
                body: request.image,
                formData: true
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'IMAGE', id: arg.courseId }]
        })
    })
})

export default apiSliceImages

export const { useSetCourseImageMutation } = apiSliceImages

export const getCourseImageURL = (courseId: number) => `/courses/${courseId}/image`
