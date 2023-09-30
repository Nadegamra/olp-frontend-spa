import { CourseResponseOwner } from '../../../dtos/Course'

function LanguageSection({ data }: { data: CourseResponseOwner }) {
    return (
        <section>
            <h1 className="text-fs-h1">Languages</h1>
            <hr className="border-clr-text1" />
            <h2>Language</h2>
            <h2>Subtitles</h2>
        </section>
    )
}

export default LanguageSection
