import CourseSectionAddBar from './courseSectionsEditPage/CourseSectionAddBar'
import CourseSectionList from './courseSectionsEditPage/CourseSectionList'

function CourseSectionsEditPage() {
    return (
        <section>
            <CourseSectionAddBar />
            <CourseSectionList editMode={true} />
        </section>
    )
}

export default CourseSectionsEditPage
