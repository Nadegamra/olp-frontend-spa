import { CourseResponse } from '../../../../dtos/Course'

function LanguagesTab({ course }: { course: CourseResponse }) {
    return (
        <section>
            <div>Languages:</div>
            {course.languages.map((l) => (
                <div>{l.language.name}</div>
            ))}
            <div>Subtitles:</div>
            {course.subtitles.map((s) => (
                <div>{s.language.name}</div>
            ))}
        </section>
    )
}

export default LanguagesTab
