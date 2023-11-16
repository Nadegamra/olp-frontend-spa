import { useParams } from 'react-router-dom'
import { CourseResponseOwner } from '../../../dtos/Course'
import CourseImageUpdateForm from './descriptionSection/CourseImageUpdateForm'
import DescriptionUpdateForm from './descriptionSection/DescriptionUpdateForm'

function DescriptionSection({ data }: { data: CourseResponseOwner }) {
    const { courseId } = useParams()
    return (
        <section>
            <h1 className="text-fs-h1">Description</h1>
            <hr className="border-clr-text1" />
            <DescriptionUpdateForm data={data} />
            <h2 className="text-fs-h2 pb-2 pt-5">Title image</h2>
            <img src={`${import.meta.env.VITE_BACKEND_URI}/courses/${courseId}/image`} />
            <CourseImageUpdateForm />
        </section>
    )
}

export default DescriptionSection
