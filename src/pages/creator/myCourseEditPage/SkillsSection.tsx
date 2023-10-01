import { CourseResponseOwner } from '../../../dtos/Course'
import DifficultyForm from './skillsSection/DifficultyForm'
import CourseGainedSkillsList from './skillsSection/GainedSkillsList'
import RequirementsList from './skillsSection/RequirementsList'
import GainedSkillsAddModal from './skillsSection/GainedSkillsAddModal'
import RequirementsAddModal from './skillsSection/RequirementsAddModal'
import GainedSkillsAddCustomForm from './skillsSection/GainedSkillAddCustomForm'
import RequirementsAddCustomForm from './skillsSection/RequirementsAddCustomForm'

function SkillsSection({ data }: { data: CourseResponseOwner }) {
    return (
        <section>
            <h1 className="text-fs-h1">Skills</h1>
            <hr className="border-clr-text1" />
            <DifficultyForm data={data} />
            <h2 className="text-fs-h2 pb-3">Gained Skills</h2>
            <CourseGainedSkillsList />
            <GainedSkillsAddModal />
            <GainedSkillsAddCustomForm />
            {/* TODO: Prevent duplicates from being addable */}
            <h2 className="text-fs-h2 pb-3">Requirements</h2>
            <RequirementsList />
            <RequirementsAddModal />
            <RequirementsAddCustomForm />
        </section>
    )
}

export default SkillsSection
