import { create } from 'zustand'
import {
    CourseCreateRequest,
    CourseResponse,
    CourseResponseOwner,
    CourseUpdateRequest
} from '../dtos/Course'
import axios from 'axios'
import { useAppSelector } from '../app/hooks'

interface CoursesAPIMetadata {
    createCourse: (request: CourseCreateRequest) => Promise<CourseResponse | false>
    deleteCourse: (id: number) => Promise<boolean>
    getCourse: (id: number) => Promise<CourseResponse | false>
    getCourseList: () => Promise<CourseResponse[] | false>
    getUserCourse: (id: number) => Promise<CourseResponseOwner | false>
    getUserCourseList: () => Promise<CourseResponseOwner[] | false>
    updateCourse: (id: number, request: CourseUpdateRequest) => Promise<CourseResponseOwner | false>
}

const store = ({ getAccessToken }: { getAccessToken: () => Promise<string | undefined> }) =>
    create<CoursesAPIMetadata>()((set, get) => {
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
            createCourse: async (request: CourseCreateRequest): Promise<CourseResponse | false> => {
                try {
                    const res = await api.post(``, request, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            },
            deleteCourse: async (id: number): Promise<boolean> => {
                try {
                    const res = await api.delete(`/${id}`, headers)
                    return res.status === 200
                } catch (err) {
                    return false
                }
            },
            getCourse: async (id: number): Promise<CourseResponse | false> => {
                try {
                    const res = await api.get(`/${id}`, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            },
            getCourseList: async (): Promise<CourseResponse[] | false> => {
                try {
                    const res = await api.get(``, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            },
            getUserCourse: async (id: number): Promise<CourseResponseOwner | false> => {
                try {
                    const res = await api.get(`/owned/${id}`, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            },
            getUserCourseList: async (): Promise<CourseResponseOwner[] | false> => {
                try {
                    const res = await api.get(`/owned`, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            },
            updateCourse: async (
                id: number,
                request: CourseUpdateRequest
            ): Promise<CourseResponseOwner | false> => {
                try {
                    const res = await api.put(`/${id}`, request, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            }
        }
    })

export default function useCourses() {
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    const getAccessToken = async () => accessToken
    return store({ getAccessToken }).getState()
}
