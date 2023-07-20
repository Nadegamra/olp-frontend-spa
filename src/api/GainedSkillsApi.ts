import axios from 'axios'
import { create } from 'zustand'
import {
    GainedSkillCreateRequest,
    GainedSkillDeleteRequest,
    GainedSkillUpdateRequest
} from '../dtos/GainedSkill'
import { useAppSelector } from '../app/hooks'

interface GainedSkillsApiMetadata {
    addGainedSkill: (request: GainedSkillCreateRequest) => Promise<boolean>
    removeGainedSkill: (request: GainedSkillDeleteRequest) => Promise<boolean>
    updateGainedSkill: (request: GainedSkillUpdateRequest) => Promise<boolean>
}

const GainedSkillsApi = ({
    getAccessToken
}: {
    getAccessToken: () => Promise<string | undefined>
}) =>
    create<GainedSkillsApiMetadata>((set, get) => {
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
            addGainedSkill: async (request: GainedSkillCreateRequest) => {
                try {
                    const res = await api.post(`/${request.courseId}/gained`, request, headers)
                    return res.status === 200
                } catch {
                    return false
                }
            },
            removeGainedSkill: async (request: GainedSkillDeleteRequest) => {
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
            updateGainedSkill: async (request: GainedSkillUpdateRequest) => {
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

export default function useGainedSkills() {
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    const getAccessToken = async () => accessToken
    return GainedSkillsApi({ getAccessToken }).getState()
}
