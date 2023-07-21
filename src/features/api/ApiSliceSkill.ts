import { SkillCreateRequest, SkillResponse, SkillUpdateRequest } from '../../dtos/Skill'
import apiSlice from './ApiSliceAuth'

const apiSliceSkills = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSkill: builder.mutation<SkillResponse, SkillCreateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/skills`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        deleteSkill: builder.mutation<undefined, number>({
            query: (id) => ({
                url: `https://localhost:44398/skills/${id}`,
                method: 'DELETE'
            })
        }),
        getSkill: builder.query<SkillResponse, number>({
            query: (id) => ({
                url: `https://localhost:44398/skills/${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        getSkillList: builder.query<SkillResponse[], undefined>({
            query: () => ({
                url: `https://localhost:44398/skills`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        updateSkill: builder.mutation<SkillResponse, SkillUpdateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/skills/${request.id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
})

export default apiSliceSkills

export const {
    useCreateSkillMutation,
    useDeleteSkillMutation,
    useGetSkillQuery,
    useGetSkillListQuery,
    useUpdateSkillMutation
} = apiSliceSkills
