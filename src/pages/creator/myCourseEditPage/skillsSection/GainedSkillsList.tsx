import { useParams } from 'react-router-dom'
import { useGetGainedSkillListQuery } from '../../../../features/api/ApiSliceGainedSkills'

function CourseGainedSkillsList() {
    const { id } = useParams()
    const { isSuccess: isSuccessGained, data: gainedSkills } = useGetGainedSkillListQuery(
        parseInt(id ?? '-1')
    )

    return (
        <>
            <div className="border p-5 rounded-lg mb-5 grid grid-cols-1 gap-2">
                {(isSuccessGained &&
                    gainedSkills.length > 0 &&
                    gainedSkills.map((skill) => (
                        <div key={skill.id} className="flex p-3 bg-clr-bg2 ">
                            <span>{skill.skill.name}</span>
                            <span className="flex-1" />
                            <span className="material-symbols-outlined pr-3">edit</span>
                            <span className="material-symbols-outlined">delete</span>
                        </div>
                    ))) || <div>Nothing here</div>}
            </div>
        </>
    )
}

export default CourseGainedSkillsList
