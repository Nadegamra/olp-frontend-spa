import { create } from 'zustand'
import axios from 'axios'
import { CourseSubtitleCreateRequest, CourseSubtitleDeleteRequest } from '../dtos/CourseSubtitle'
import { useAppSelector } from '../app/hooks'

interface SubtitlesApiMetadata {
    addCourseSubtitle: (request: CourseSubtitleCreateRequest) => Promise<boolean>
    removeCourseSubtitle: (request: CourseSubtitleDeleteRequest) => Promise<boolean>
}

const SubtitlesApi = ({ getAccessToken }: { getAccessToken: () => Promise<string | undefined> }) =>
    create<SubtitlesApiMetadata>((set, get) => {
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
            addCourseSubtitle: async (request: CourseSubtitleCreateRequest) => {
                try {
                    const res = await api.post(`/${request.courseId}/subtitles`, request, headers)
                    return res.status === 200
                } catch {
                    return false
                }
            },
            removeCourseSubtitle: async (request: CourseSubtitleDeleteRequest) => {
                try {
                    const res = await api.delete(
                        `/${request.courseId}/subtitles/${request.id}`,
                        headers
                    )
                    return res.status === 200
                } catch {
                    return false
                }
            }
        }
    })

export default function useSubtitles() {
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    const getAccessToken = async () => accessToken
    return SubtitlesApi({ getAccessToken }).getState()
}
