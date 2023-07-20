import { create } from 'zustand'
import axios from 'axios'
import { CourseLanguageCreateRequest, CourseLanguageDeleteRequest } from '../dtos/CourseLanguage'
import { useAppSelector } from '../app/hooks'

interface LanguagesApiMetadata {
    addCourseLanguage: (request: CourseLanguageCreateRequest) => Promise<boolean>
    removeCourseLanguage: (request: CourseLanguageDeleteRequest) => Promise<boolean>
}

const LanguagesApi = ({ getAccessToken }: { getAccessToken: () => Promise<string | undefined> }) =>
    create<LanguagesApiMetadata>((set, get) => {
        const api = axios.create({
            baseURL: 'https://localhost:44398/Courses'
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
            addCourseLanguage: async (request: CourseLanguageCreateRequest) => {
                try {
                    const res = await api.post(`/${request.courseId}/languages`, request, headers)
                    return res.status === 200
                } catch {
                    return false
                }
            },
            removeCourseLanguage: async (request: CourseLanguageDeleteRequest) => {
                try {
                    const res = await api.delete(
                        `/${request.courseId}/languages/${request.id}`,
                        headers
                    )
                    return res.status === 200
                } catch {
                    return false
                }
            }
        }
    })

export default function useLanguages() {
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    const getAccessToken = async () => accessToken

    return LanguagesApi({ getAccessToken }).getState()
}
