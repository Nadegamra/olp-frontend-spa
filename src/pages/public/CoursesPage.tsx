import { useState } from 'react'
import { CourseGetListRequest } from '../../dtos/Course'
import { useGetCourseCountQuery, useGetCourseListQuery } from '../../features/api/ApiSliceCourses'
import SearchBar from '../../components/layout/SearchBar'
import { Link } from 'react-router-dom'
import Pagination from '../../components/layout/Pagination'
import CoursesSkeletonLoader from '../../components/skeleton/CoursesSkeletonLoader'

function CoursesPage() {
    const [from, setFrom] = useState<number>(0)
    const perPage = 10
    const to = from + perPage

    const [searchPhrase, setSearchPhrase] = useState<string>('')
    const [request, setRequest] = useState<CourseGetListRequest>(new CourseGetListRequest())

    const { data: count } = useGetCourseCountQuery(request)
    const { data, isFetching, isError } = useGetCourseListQuery(request)
    if (isFetching) {
        return <CoursesSkeletonLoader includeAdd={false} />
    } else {
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
                    {data !== undefined &&
                        data.map((course) => (
                            <Link
                                key={course.id}
                                className="flex flex-col p-2 border rounded-2xl text-center align-middle w-[300px] items-center content-center"
                                to={`/courses/${course.id}`}>
                                <img
                                    className="rounded-2xl"
                                    src={`/courses/${course.id}/image`}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null
                                        currentTarget.src = './NoImage.jpg'
                                    }}
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

export default CoursesPage
