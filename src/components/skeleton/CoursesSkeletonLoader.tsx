import { Link } from 'react-router-dom'
import SearchBar from '../layout/SearchBar'
import { useEffect, useRef, useState } from 'react'
function CoursesSkeletonLoader({ includeAdd }: { includeAdd: boolean }) {
    const [visibleElements, setVisibleElements] = useState<number>(10)
    const gridRef = useRef<HTMLDivElement>(null)

    const updateVisibleElements = () => {
        const grid = gridRef.current
        const width = grid?.clientWidth
        let rowElements = 10
        if (width !== undefined) {
            switch (true) {
                case width <= 640:
                    rowElements = 1
                    break
                case width <= 1024:
                    rowElements = 2
                    break
                case width <= 1280:
                    rowElements = 3
                    break
                case width <= 1536:
                    rowElements = 4
                    break
                default:
                    rowElements = 5
            }
            setVisibleElements(rowElements * 3 - (includeAdd ? 1 : 0))
        }
    }

    useEffect(() => {
        window.addEventListener('resize', updateVisibleElements)
        updateVisibleElements()
        return () => window.removeEventListener('resize', updateVisibleElements)
    }, [])

    return (
        <>
            {<SearchBar phrase={''} setPhrase={() => null} onClick={() => null} />}
            <section
                ref={gridRef}
                className="grid auto-cols-[400px] auto-rows-[200px] gap-10 grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-5 h-full">
                {includeAdd && (
                    <Link
                        className="flex flex-col p-10 border rounded-2xl text-center align-middle w-[300px]"
                        to={`/addCourse`}>
                        <span className="material-symbols-outlined text-[100px]">add_circle</span>
                        <span>New Course</span>
                    </Link>
                )}
                {[...Array(visibleElements)].map((_, idx) => (
                    <div key={idx} role="status" className={`animate-pulse w-[300px]`}>
                        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-2xl">
                            <svg
                                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ))}
            </section>
        </>
    )
}

export default CoursesSkeletonLoader
