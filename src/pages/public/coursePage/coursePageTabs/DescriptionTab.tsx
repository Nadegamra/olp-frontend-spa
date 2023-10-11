import { CourseResponse } from '../../../../dtos/Course'

function DescriptionTab({ course }: { course: CourseResponse }) {
    return (
        <section>
            <div>Name: {course.name}</div>
            <div>Short description: {course.shortDescription}</div>
            <div>Detailed description: {course.detailedDescription}</div>
        </section>
    )
}

export default DescriptionTab
