import InputField from '../../../../components/forms/InputField'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../../dtos/Course'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useUpdateCourseMutation } from '../../../../features/api/ApiSliceCourses'
import { toast } from 'react-toastify'
import TextAreaField from '../../../../components/forms/TextAreaField'
import Button from '../../../../components/forms/Button'
import Spinner from '../../../../components/forms/Spinner'

interface FormProps {
    name: string
    shortDescription: string
    detailedDescription: string
}

function DescriptionUpdateForm({
    data: { name, shortDescription, detailedDescription }
}: {
    data: CourseResponseOwner
}) {
    const { courseId } = useParams()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormProps>()

    useEffect(() => {
        reset({
            name,
            shortDescription,
            detailedDescription
        })
    }, [])
    const [updateCourse, { isLoading }] = useUpdateCourseMutation()

    return (
        <>
            <form
                className="mt-5"
                onSubmit={handleSubmit(({ name, shortDescription, detailedDescription }) => {
                    updateCourse({
                        request: new CourseUpdateRequest({
                            id: parseInt(courseId ?? '-1'),
                            name,
                            shortDescription,
                            detailedDescription
                        })
                    })
                        .unwrap()
                        .then(() => {
                            toast.success('Course updated successfully!')
                        })
                        .catch(() => {
                            toast.error('An error has occured while update course info')
                        })
                })}>
                <fieldset className="w-[min(500px,60%)] mb-5">
                    <InputField
                        text="Name"
                        label="name"
                        placeholder="Name"
                        {...register('name', { required: true })}
                        error={errors.name && 'Field is required'}
                    />
                    <TextAreaField
                        text="Short Description"
                        label="shortDescription"
                        placeholder="A Short Description of the course"
                        {...register('shortDescription', { required: true })}
                        error={errors.shortDescription && 'Field is required'}
                    />
                    <TextAreaField
                        text="Detailed Description"
                        label="detailedDescription"
                        placeholder="A Detailed Description of the course"
                        {...register('detailedDescription', { required: true })}
                        error={errors.detailedDescription && 'Field is required'}
                    />
                </fieldset>
                <Button type="submit">Save Changes</Button>
            </form>
            {isLoading && <Spinner />}
        </>
    )
}

export default DescriptionUpdateForm
