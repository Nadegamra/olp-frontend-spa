import { create } from 'zustand'
import { CreatorResponse, CreatorUpdateRequest } from '../dtos/Creator'
import axios from 'axios'
import useAuth from '../stores/AuthStore'

interface CreatorsAPIMetadata {
    updateCreator: (request: CreatorUpdateRequest) => Promise<boolean>
    getCreatorProfile: () => Promise<CreatorResponse | boolean>
}

const store = ({ getAccessToken }: { getAccessToken: () => Promise<string | undefined> }) =>
    create<CreatorsAPIMetadata>()((set, get) => {
        const api = axios.create({
            baseURL: 'https://localhost:44398/creator'
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
            updateCreator: async (request: CreatorUpdateRequest) => {
                try {
                    const res = await api.put(``, request, headers)
                    return res.status === 200
                } catch (err) {
                    return false
                }
            },
            getCreatorProfile: async () => {
                try {
                    const res = await api.get(``, headers)
                    return res.data
                } catch (err) {
                    return false
                }
            }
        }
    })

export default function useCreators() {
    const { getAccessToken } = useAuth()
    return store({ getAccessToken }).getState()
}
