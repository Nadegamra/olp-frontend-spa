import axios from 'axios'
import { create } from 'zustand'
import {
    CourseRequirementCreateRequest,
    CourseRequirementDeleteRequest,
    CourseRequirementUpdateRequest
} from '../dtos/CourseRequirement'
import { useAppSelector } from '../app/hooks'

interface CourseRequirementsApiMetadata {
    addCourseRequirement: (request: CourseRequirementCreateRequest) => Promise<boolean>
    removeCourseRequirement: (request: CourseRequirementDeleteRequest) => Promise<boolean>
    updateCourseRequirement: (request: CourseRequirementUpdateRequest) => Promise<boolean>
}

const CourseRequirementsApi = ({
    getAccessToken
}: {
    getAccessToken: () => Promise<string | undefined>
}) =>
    create<CourseRequirementsApiMetadata>((set, get) => {
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
            addCourseRequirement: async (request: CourseRequirementCreateRequest) => {
                try {
                    const res = await api.post(`/${request.courseId}/gained`, request, headers)
                    return res.status === 200
                } catch {
                    return false
                }
            },
            removeCourseRequirement: async (request: CourseRequirementDeleteRequest) => {
                try {
                    const res = await api.delete(
                        `/${request.courseId}/gained/${request.id}`,
                        headers
                    )
                    return res.status === 200
                } catch {
                    return false
                }
            },
            updateCourseRequirement: async (request: CourseRequirementUpdateRequest) => {
                try {
                    const res = await api.put(
                        `/${request.courseId}/gained/${request.id}`,
                        request,
                        headers
                    )
                    return res.status === 200
                } catch {
                    return false
                }
            }
        }
    })

export default function useCourseRequirements() {
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    const getAccessToken = async () => accessToken

    return CourseRequirementsApi({ getAccessToken }).getState()
}
