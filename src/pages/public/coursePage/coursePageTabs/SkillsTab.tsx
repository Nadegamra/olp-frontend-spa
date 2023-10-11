import { CourseResponse } from '../../../../dtos/Course'

function SkillsTab({ course }: { course: CourseResponse }) {
    return (
        <section>
            <div>Difficulty: {course.difficulty}</div>
            <div>Gained Skills:</div>
            {course.gainedSkills.map((gs) => (
                <div className="pl-3">{gs.skill?.name ?? gs.customDescription}</div>
            ))}
            <div>Requirements:</div>
            {course.requirements.map((gs) => (
                <div className="pl-3">{gs.skill?.name ?? gs.customDescription}</div>
            ))}
        </section>
    )
}

export default SkillsTab
