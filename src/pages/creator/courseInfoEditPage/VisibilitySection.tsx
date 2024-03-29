import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../dtos/Course'
import { toast } from 'react-toastify'
import Button from '../../../components/forms/Button'
import { useUpdateCourseMutation } from '../../../features/api/ApiSliceCourses'

interface FormProps {
    isHidden: boolean
}

function VisibilitySection({ data: { isHidden } }: { data: CourseResponseOwner }) {
    const { courseId } = useParams()
    const { reset } = useForm<FormProps>()

    useEffect(() => {
        reset({
            isHidden
        })
    }, [])

    const [updateCourse] = useUpdateCourseMutation()

    return (
        <section>
            <h1 className="text-fs-h1">Visibility</h1>
            <hr className="border-clr-text1" />
            <p className="py-5 text-clr-error">
                WARNING: This option will change course visibility to the platform users
            </p>
            <Button
                color="error"
                onClick={() => {
                    updateCourse({
                        request: new CourseUpdateRequest({
                            id: parseInt(courseId ?? '-1'),
                            isHidden: !isHidden
                        })
                    })
                        .unwrap()
                        .then(() => {
                            toast.success('Course updated successfully!')
                        })
                        .catch(() => {
                            toast.error('An error has occured while update course info')
                        })
                }}>
                {isHidden ? 'Make public' : 'Make private'}
            </Button>
        </section>
    )
}

export default VisibilitySection
