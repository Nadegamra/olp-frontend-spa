import {
    SkillCountResponse,
    SkillCreateRequest,
    SkillResponse,
    SkillSuggestion,
    SkillUpdateRequest
} from '../../dtos/Skill'
import apiSlice from './ApiSliceAuth'

const apiSliceSkills = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSkill: builder.mutation<SkillResponse, SkillCreateRequest>({
            query: (request) => ({
                url: `/skills`,
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
                url: `/skills/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SKILL']
        }),
        getSkill: builder.query<SkillResponse, number>({
            query: (id) => ({
                url: `/skills/${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: ['SKILL']
        }),
        getSkillList: builder.query<SkillResponse[], { skip: number; take: number }>({
            query: ({ skip, take }) => ({
                url: `/skills?skip=${skip}&take=${take}`,
                method: 'GET'
            }),
            transformResponse: (response: { items: SkillResponse[] }, _meta, _arg) => {
                return response.items
            },
            providesTags: ['SKILL']
        }),
        updateSkill: builder.mutation<SkillResponse, SkillUpdateRequest>({
            query: (request) => ({
                url: `/skills/${request.id}`,
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
                url: '/skills/count',
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
                        ? `/skills/suggestions?name=`
                        : `/skills/suggestions?name=${encodeURIComponent(name)}`,
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
