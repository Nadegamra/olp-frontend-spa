import { create } from 'zustand'
import { SkillCreateRequest, SkillResponse, SkillUpdateRequest } from '../dtos/Skill'
import axios from 'axios'
import useAuth from '../stores/AuthStore'

interface SkillsAPIMetadata {
    createSkill: (request: SkillCreateRequest) => Promise<SkillResponse | false>
    deleteSkill: (id: number) => Promise<boolean>
    getSkill: (id: number) => Promise<SkillResponse | false>
    getSkillList: () => Promise<SkillResponse[] | false>
    // Is it necessary to return data if the exactly same data as in the request is returned?
    updateSkill: (request: SkillUpdateRequest) => Promise<SkillResponse | false>
}

const skillsAPI = ({ getAccessToken }: { getAccessToken: () => Promise<string | undefined> }) =>
    create<SkillsAPIMetadata>()((set, get) => {
        const api = axios.create({
            baseURL: 'https://localhost:44398/skills'
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
            createSkill: async (request: SkillCreateRequest): Promise<SkillResponse | false> => {
                try {
                    const res = await api.post(``, request, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            },
            deleteSkill: async (id: number): Promise<boolean> => {
                try {
                    const res = await api.delete(`/${id}`, headers)
                    return res.status === 200
                } catch (err) {
                    return false
                }
            },
            getSkill: async (id: number): Promise<SkillResponse | false> => {
                try {
                    const res = await api.get(`/${id}`, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            },
            getSkillList: async (): Promise<SkillResponse[] | false> => {
                try {
                    const res = await api.get(``, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            },
            updateSkill: async (request: SkillUpdateRequest): Promise<SkillResponse | false> => {
                try {
                    const res = await api.put(``, request, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            }
        }
    })

export default function useSkills() {
    const { getAccessToken } = useAuth()
    return skillsAPI({ getAccessToken }).getState()
}
