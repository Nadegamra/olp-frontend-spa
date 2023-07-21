import {
    GainedSkillCreateRequest,
    GainedSkillDeleteRequest,
    GainedSkillUpdateRequest
} from '../../dtos/GainedSkill'
import apiSlice from './ApiSliceAuth'

const apiSliceGainedSkills = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addGainedSkill: builder.mutation<undefined, GainedSkillCreateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/gained`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        removeGainedSkill: builder.mutation<undefined, GainedSkillDeleteRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/gained/${request.id}`,
                method: 'DELETE',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        updateGainedSkill: builder.mutation<undefined, GainedSkillUpdateRequest>({
            query: (request) => ({
                url: `https://localhost:44398/courses/${request.courseId}/gained/${request.id}`,
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
})

export default apiSliceGainedSkills

export const {
    useAddGainedSkillMutation,
    useRemoveGainedSkillMutation,
    useUpdateGainedSkillMutation
} = apiSliceGainedSkills
