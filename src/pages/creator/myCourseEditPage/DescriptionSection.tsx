import { useForm } from 'react-hook-form'
import InputField from '../../../components/forms/InputField'
import TextAreaField from '../../../components/forms/TextAreaField'
import Button from '../../../components/forms/Button'
import { useUpdateCourseMutation } from '../../../features/api/ApiSliceCourses'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../dtos/Course'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from '../../../components/forms/Spinner'
import { toast } from 'react-toastify'

interface FormProps {
    name: string
    shortDescription: string
    detailedDescription: string
}

function DescriptionSection({
    data: { name, shortDescription, detailedDescription }
}: {
    data: CourseResponseOwner
}) {
    const { id } = useParams()
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
        <section>
            <h1 className="text-fs-h1">Description</h1>
            <hr className="border-clr-text1" />
            <form
                className="mt-5"
                onSubmit={handleSubmit(({ name, shortDescription, detailedDescription }) => {
                    updateCourse({
                        request: new CourseUpdateRequest({
                            id: parseInt(id ?? '-1'),
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
        </section>
    )
}

export default DescriptionSection
