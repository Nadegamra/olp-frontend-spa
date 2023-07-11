import { create } from 'zustand'
import axios from 'axios'
import useAuth from '../stores/AuthStore'
import { CourseLanguageCreateRequest, CourseLanguageDeleteRequest } from '../dtos/CourseLanguage'

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
    const { getAccessToken } = useAuth()
    return LanguagesApi({ getAccessToken }).getState()
}
