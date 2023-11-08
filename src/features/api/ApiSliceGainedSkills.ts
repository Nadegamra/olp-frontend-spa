import {
    GainedSkill,
    GainedSkillCreateRequest,
    GainedSkillDeleteRequest,
    GainedSkillUpdateRequest
} from '../../dtos/GainedSkill'
import apiSlice from './ApiSliceAuth'

const apiSliceGainedSkills = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGainedSkillList: builder.query<GainedSkill[], number>({
            query: (courseId) => ({
                url: `/courses/${courseId}/gained`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{ type: 'GAINED_SKILL', id: arg }]
        }),
        addGainedSkill: builder.mutation<undefined, GainedSkillCreateRequest>({
            query: (request) => ({
                url: `/courses/${request.courseId}/gained`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'GAINED_SKILL', id: arg.courseId }]
        }),
        removeGainedSkill: builder.mutation<undefined, GainedSkillDeleteRequest>({
            query: (request) => ({
                url: `/courses/${request.courseId}/gained/${request.id}`,
                method: 'DELETE',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'GAINED_SKILL', id: arg.courseId }]
        }),
        updateGainedSkill: builder.mutation<undefined, GainedSkillUpdateRequest>({
            query: (request) => ({
                url: `/courses/${request.courseId}/gained/${request.id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'GAINED_SKILL', id: arg.courseId }]
        })
    })
})

export default apiSliceGainedSkills

export const {
    useGetGainedSkillListQuery,
    useAddGainedSkillMutation,
    useRemoveGainedSkillMutation,
    useUpdateGainedSkillMutation
} = apiSliceGainedSkills
