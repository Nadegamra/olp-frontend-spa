import { CourseResponseOwner } from '../../../dtos/Course'
import DifficultyForm from './skillsSection/DifficultyForm'
import CourseGainedSkillsList from './skillsSection/CourseGainedSkillsList'
import CourseRequirementsList from './skillsSection/CourseRequirementsList'

function SkillsSection({ data }: { data: CourseResponseOwner }) {
    return (
        <section>
            <h1 className="text-fs-h1">Skills</h1>
            <hr className="border-clr-text1" />
            <DifficultyForm data={data} />
            <h1 className="text-fs-h2 pb-3">Gained Skills</h1>
            <CourseGainedSkillsList />
            <h1 className="text-fs-h2 pb-3">Requirements</h1>
            <CourseRequirementsList />
        </section>
    )
}

export default SkillsSection
