import { CourseResponse } from '../../../dtos/Course'
import { useGetCreatorProfileAnonymousQuery } from '../../../features/api/ApiSliceCreators'

function CoursePageHeader({ course }: { course: CourseResponse }) {
    const { data: creator } = useGetCreatorProfileAnonymousQuery(course.userId)

    return (
        <section>
            <div></div>
            Course {course.name} by {creator?.username}
        </section>
    )
}

export default CoursePageHeader
