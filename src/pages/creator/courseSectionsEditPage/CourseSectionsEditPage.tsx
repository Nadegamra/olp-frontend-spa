import CourseSectionAddBar from './CourseSectionAddBar'
import CourseSectionList from './CourseSectionList'

function CourseSectionsEditPage() {
    return (
        <section>
            <CourseSectionList editMode={true} />
            <CourseSectionAddBar />
        </section>
    )
}

export default CourseSectionsEditPage
