import { useEffect } from 'react'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../dtos/Course'
import { useForm } from 'react-hook-form'
import { useUpdateCourseMutation } from '../../../features/api/ApiSliceCourses'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import InputField from '../../../components/forms/InputField'
import Button from '../../../components/forms/Button'
import Spinner from '../../../components/forms/Spinner'

interface FormProps {
    price: number
}

function PricingSection({ data: { price } }: { data: CourseResponseOwner }) {
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormProps>()

    useEffect(() => {
        reset({
            price
        })
    }, [])

    const [updateCourse, { isLoading }] = useUpdateCourseMutation()
    return (
        <section>
            <h1 className="text-fs-h1">Description</h1>
            <hr className="border-clr-text1" />
            <form
                className="mt-5"
                onSubmit={handleSubmit(({ price }) => {
                    updateCourse({
                        request: new CourseUpdateRequest({
                            id: parseInt(id ?? '-1'),
                            price
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
                        text="Price"
                        label="price"
                        placeholder="39.99"
                        {...register('price', { required: true })}
                        error={errors.price && 'Field is required'}
                    />
                </fieldset>
                <Button type="submit">Save Changes</Button>
            </form>
            {isLoading && <Spinner />}
        </section>
    )
}

export default PricingSection
