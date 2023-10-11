import { CourseResponse } from '../../../../dtos/Course'

function LanguagesTab({ course }: { course: CourseResponse }) {
    return (
        <section>
            <div>Languages:</div>
            {course.languages.map((l) => (
                <div className="pl-3">{l.language.name}</div>
            ))}
            <div>Subtitles:</div>
            {course.subtitles.map((s) => (
                <div className="pl-3">{s.language.name}</div>
            ))}
        </section>
    )
}

export default LanguagesTab
