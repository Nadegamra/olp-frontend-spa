import { Link } from 'react-router-dom'
import { useGetUserCourseListQuery } from '../../features/api/ApiSliceCourses'

function MyCoursesPage() {
    const { data, isFetching, isError } = useGetUserCourseListQuery(undefined)
    if (!isFetching) {
        if (isError) {
            return <section>An error has occured</section>
        }
        return (
            <section>
                {data !== undefined &&
                    data.map((course) => (
                        <Link to={`/myCourses/${course.id}/description`}>{course.name}</Link>
                    ))}
            </section>
        )
    }
}

export default MyCoursesPage
