import { create } from 'zustand'
import { SetCourseImageRequest } from '../dtos/CourseImage'
import axios from 'axios'
import { useAppSelector } from '../app/hooks'

interface ImagesApiMetadata {
    setCourseImage: (request: SetCourseImageRequest) => Promise<boolean>
    getCourseImageURL: (courseId: number) => string
}

const ImagesApi = ({ getAccessToken }: { getAccessToken: () => Promise<string | undefined> }) =>
    create<ImagesApiMetadata>((set, get) => {
        const api = axios.create({
            baseURL: 'https://localhost:44398/courses'
        })

        let headers = {}
        getAccessToken().then((token) => {
            headers = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        return {
            setCourseImage: async (request: SetCourseImageRequest) => {
                try {
                    const res = await api.put(`/${request.courseId}/image`, request, {
                        ...headers,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })
                    return res.status === 200
                } catch {
                    return false
                }
            },
            getCourseImageURL: (courseId: number) => {
                return `https://localhost:44398/courses/${courseId}/image`
            }
        }
    })

export default function useImages() {
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    const getAccessToken = async () => accessToken
    return ImagesApi({ getAccessToken }).getState()
}
