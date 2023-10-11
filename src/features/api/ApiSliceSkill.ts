import {
    SkillCountResponse,
    SkillCreateRequest,
    SkillListRequest,
    SkillResponse,
    SkillSuggestion,
    SkillUpdateRequest
} from '../../dtos/Skill'
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
            }),
            invalidatesTags: ['SKILL']
        }),
        deleteSkill: builder.mutation<undefined, number>({
            query: (id) => ({
                url: `https://localhost:44398/skills/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SKILL']
        }),
        getSkill: builder.query<SkillResponse, number>({
            query: (id) => ({
                url: `https://localhost:44398/skills/${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: ['SKILL']
        }),
        getSkillList: builder.query<SkillResponse[], { skip: number; take: number }>({
            query: ({ skip, take }) => ({
                url: `https://localhost:44398/skills?skip=${skip}&take=${take}`,
                method: 'GET'
            }),
            transformResponse: (response: { items: SkillResponse[] }, meta, arg) => {
                return response.items
            },
            providesTags: ['SKILL']
        }),
        updateSkill: builder.mutation<SkillResponse, SkillUpdateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/skills/${request.id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['SKILL']
        }),
        getSkillsCount: builder.query<SkillCountResponse, undefined>({
            query: () => ({
                url: 'https://localhost:44398/skills/count',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: ['SKILL']
        }),
        getSkillsSuggestions: builder.query<SkillSuggestion[], string>({
            query: (name) => ({
                url:
                    name === ''
                        ? `https://localhost:44398/skills/suggestions?name=`
                        : `https://localhost:44398/skills/suggestions?name=${encodeURIComponent(
                              name
                          )}`,
                method: 'GET'
            }),
            providesTags: ['SKILL']
        })
    })
})

export default apiSliceSkills

export const {
    useCreateSkillMutation,
    useDeleteSkillMutation,
    useGetSkillQuery,
    useGetSkillListQuery,
    useUpdateSkillMutation,
    useGetSkillsCountQuery,
    useGetSkillsSuggestionsQuery
} = apiSliceSkills
