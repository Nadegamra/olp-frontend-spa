import { Link } from 'react-router-dom'
import { useGetCourseCountQuery, useGetCourseListQuery } from '../../features/api/ApiSliceCourses'
import SearchBar from '../../components/layout/SearchBar'
import { useState } from 'react'
import { CourseGetListRequest } from '../../dtos/Course'
import Pagination from '../../components/layout/Pagination'

function MyCoursesPage() {
    const [from, setFrom] = useState<number>(0)
    const perPage = 10
    const to = from + perPage

    const [searchPhrase, setSearchPhrase] = useState<string>('')
    const [request, setRequest] = useState<CourseGetListRequest>(new CourseGetListRequest())

    const { data: count } = useGetCourseCountQuery(request)
    const { data, isFetching, isError } = useGetCourseListQuery(request)

    if (!isFetching) {
        if (isError) {
            return <section>An error has occured</section>
        }
        return (
            <>
                <SearchBar
                    phrase={searchPhrase}
                    setPhrase={setSearchPhrase}
                    onClick={() => setRequest(new CourseGetListRequest(searchPhrase, from, to))}
                />
                <section className="grid auto-cols-[400px] auto-rows-[200px] gap-10 grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-5">
                    <Link
                        className="flex flex-col p-10 border rounded-2xl text-center align-middle w-[300px]"
                        to={`/addCourse`}>
                        <span className="material-symbols-outlined text-[100px]">add_circle</span>
                        <span>New Course</span>
                    </Link>
                    {data !== undefined &&
                        data.map((course) => (
                            <Link
                                key={course.id}
                                className="flex flex-col p-2 border rounded-2xl text-center align-middle w-[300px] items-center content-center"
                                to={`/myCourses/${course.id}/description`}>
                                <img
                                    className="rounded-2xl"
                                    src={`https://localhost:44398/courses/${course.id}/image`}
                                />
                                <span className="absolute">{course.name}</span>
                            </Link>
                        ))}
                </section>
                <Pagination
                    from={from}
                    to={to}
                    of={count?.count ?? -1}
                    units="Courses"
                    setFrom={setFrom}
                />
            </>
        )
    }
}

export default MyCoursesPage
