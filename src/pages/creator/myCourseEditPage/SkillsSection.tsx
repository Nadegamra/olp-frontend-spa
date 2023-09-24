import { CourseResponseOwner } from '../../../dtos/Course'
import DifficultyForm from './skillsSection/DifficultyForm'
import CourseGainedSkillsList from './skillsSection/GainedSkillsList'
import RequirementsList from './skillsSection/RequirementsList'
import GainedSkillsAddModal from './skillsSection/GainedSkillsAddModal'
import RequirementsAddModal from './skillsSection/RequirementsAddModal'

function SkillsSection({ data }: { data: CourseResponseOwner }) {
    return (
        <section>
            <h1 className="text-fs-h1">Skills</h1>
            <hr className="border-clr-text1" />
            <DifficultyForm data={data} />
            <h1 className="text-fs-h2 pb-3">Gained Skills</h1>
            <CourseGainedSkillsList />
            <GainedSkillsAddModal />
            {/* TODO: Prevent duplicates from being addable */}
            <h1 className="text-fs-h2 pb-3">Requirements</h1>
            <RequirementsList />
            <RequirementsAddModal />
        </section>
    )
}

export default SkillsSection
