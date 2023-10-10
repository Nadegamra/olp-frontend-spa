import { CourseResponse } from '../../../../dtos/Course'

function SkillsTab({ course }: { course: CourseResponse }) {
    return (
        <section>
            <div>Difficulty: {course.difficulty}</div>
            <div>Gained Skills: {course.gainedSkills.length}</div>
            <div>Requirements: {course.requirements.length}</div>
        </section>
    )
}

export default SkillsTab
