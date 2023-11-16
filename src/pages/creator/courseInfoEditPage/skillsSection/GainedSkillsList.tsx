import { useParams } from 'react-router-dom'
import {
    useGetGainedSkillListQuery,
    useRemoveGainedSkillMutation
} from '../../../../features/api/ApiSliceGainedSkills'
import { GainedSkillDeleteRequest } from '../../../../dtos/GainedSkill'
import GainedSkillEditCustomForm from './GainedSkillEditCustomForm'

function CourseGainedSkillsList() {
    const { courseId } = useParams()
    const { isSuccess: isSuccessGained, data: gainedSkills } = useGetGainedSkillListQuery(
        parseInt(courseId ?? '-1')
    )
    const [removeGainedSkill] = useRemoveGainedSkillMutation()
    return (
        <>
            <div className="border p-5 rounded-lg mb-5 grid grid-cols-1 gap-2">
                {(isSuccessGained &&
                    gainedSkills.length > 0 &&
                    gainedSkills.map((skill) => (
                        <div key={skill.id} className="flex p-3 bg-clr-bg2 ">
                            <span>
                                {skill.skill !== null ? skill.skill.name : skill.customDescription}
                            </span>
                            <span className="flex-1" />
                            {skill.customDescription !== '' && (
                                <GainedSkillEditCustomForm gainedSkill={skill} />
                            )}
                            <span
                                className="material-symbols-outlined cursor-pointer"
                                onClick={() =>
                                    removeGainedSkill(
                                        new GainedSkillDeleteRequest(skill.courseId, skill.id)
                                    )
                                }>
                                delete
                            </span>
                        </div>
                    ))) || <div>Nothing here</div>}
            </div>
        </>
    )
}

export default CourseGainedSkillsList
