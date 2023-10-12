import { useParams } from 'react-router-dom'
import { useGetCourseQuery } from '../../features/api/ApiSliceCourses'
import CoursePageHeader from './coursePage/CoursePageHeader'
import CoursePageTabs from './coursePage/CoursePageTabs'
import CourseSectionList from '../creator/courseSectionsEditPage/CourseSectionList'

function CoursePage() {
    const { id } = useParams()
    const { data } = useGetCourseQuery(parseInt(id ?? '-1'))
    if (data !== undefined)
        return (
            <>
                <div className="flex flex-col px-5">
                    <CoursePageHeader course={data} />
                    <CoursePageTabs course={data} />
                    <CourseSectionList editMode={false} />
                </div>
            </>
        )
}

export default CoursePage
