import { useParams } from 'react-router-dom'
import { useGetCourseQuery } from '../../features/api/ApiSliceCourses'

function CoursePage() {
    const { id } = useParams()
    const { data } = useGetCourseQuery(parseInt(id ?? '-1'))
    return (
        <>
            <div></div>
        </>
    )
}

export default CoursePage
