import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteCourseMutation } from '../../../features/api/ApiSliceCourses'
import Button from '../../../components/forms/Button'
import { toast } from 'react-toastify'

function DeleteSection() {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const [deleteCourse] = useDeleteCourseMutation()

    return (
        <section>
            <h1 className="text-fs-h1">Course Deletion</h1>
            <hr className="border-clr-text1" />
            <p className="py-5 text-clr-error">
                WARNING: This option will delete the course from the platform
            </p>
            <Button
                color="error"
                onClick={() => {
                    deleteCourse(parseInt(courseId ?? '-1'))
                        .unwrap()
                        .then(() => {
                            navigate('/myCourses')
                            toast.success('Course deleted successfully!')
                        })
                        .catch(() => {
                            toast.error('An error has occured while deleting the course')
                        })
                }}>
                Delete course
            </Button>
        </section>
    )
}

export default DeleteSection
