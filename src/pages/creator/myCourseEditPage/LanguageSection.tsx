import { CourseResponseOwner } from '../../../dtos/Course'
import LanguagesAddModal from './languageSection/LanguagesAddModal'
import LanguagesList from './languageSection/LanguagesList'
import SelectPrimaryLanguageForm from './languageSection/SelectPrimaryLanguageForm'
import SubtitlesAddModal from './languageSection/SubtitlesAddModal'
import SubtitlesList from './languageSection/SubtitlesList'

function LanguageSection({ data }: { data: CourseResponseOwner }) {
    return (
        <section>
            <h1 className="text-fs-h1">Languages</h1>
            <hr className="border-clr-text1" />
            <h2 className="text-fs-h2 pb-2 pt-5">Language</h2>
            <LanguagesList />
            <LanguagesAddModal />
            <SelectPrimaryLanguageForm />
            <h2 className="text-fs-h2 pb-2">Subtitles</h2>
            <SubtitlesList />
            <SubtitlesAddModal />
        </section>
    )
}

export default LanguageSection
