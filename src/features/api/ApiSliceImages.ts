import { SetCourseImageRequest } from '../../dtos/CourseImage'
import apiSlice from './ApiSliceAuth'

const apiSliceImages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setCourseImage: builder.mutation<undefined, SetCourseImageRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/image`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
})

export default apiSliceImages

export const { useSetCourseImageMutation } = apiSliceImages

export const getCourseImageURL = (courseId: number) =>
    `https://locahost:44398/courses/${courseId}/image`
