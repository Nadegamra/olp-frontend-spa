import CourseSectionAddBar from './courseSectionsEditPage/CourseSectionAddBar'
import CourseSectionList from './courseSectionsEditPage/CourseSectionList'

function CourseSectionsEditPage() {
    return (
        <section>
            <CourseSectionList editMode={true} />
            <CourseSectionAddBar />
        </section>
    )
}

export default CourseSectionsEditPage
