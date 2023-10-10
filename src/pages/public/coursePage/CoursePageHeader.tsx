import { CourseResponse } from '../../../dtos/Course'
import { useGetCreatorProfileAnonymousQuery } from '../../../features/api/ApiSliceCreators'

function CoursePageHeader({ course }: { course: CourseResponse }) {
    const { data: creator } = useGetCreatorProfileAnonymousQuery(course.userId)

    return (
        <section className="pb-5">
            <h1 className="px-20 pt-20 text-fs-h1">{course.name}</h1>
            <h2 className="px-20 text-fs-h1">by {creator?.username}</h2>
        </section>
    )
}

export default CoursePageHeader
