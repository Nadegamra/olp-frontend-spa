import { Link } from 'react-router-dom'
import { useGetUserCourseListQuery } from '../../features/api/ApiSliceCourses'

function MyCoursesPage() {
    const { data, isFetching, isError } = useGetUserCourseListQuery(undefined)
    if (!isFetching) {
        if (isError) {
            return <section>An error has occured</section>
        }
        return (
            <section className="grid auto-cols-[400px] auto-rows-[200px] gap-10 grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-5">
                <Link
                    className="flex flex-col p-10 border rounded-2xl text-center align-middle w-[300px]"
                    to={`/addCourse`}>
                    <span className="material-symbols-outlined text-[100px]">add_circle</span>
                    <span>New Course</span>
                </Link>
                {data !== undefined &&
                    data.map((course) => (
                        <Link to={`/myCourses/${course.id}/description`}>{course.name}</Link>
                    ))}
            </section>
        )
    }
}

export default MyCoursesPage
