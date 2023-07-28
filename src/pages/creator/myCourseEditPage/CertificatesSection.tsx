import { useForm } from 'react-hook-form'
import InputField from '../../../components/forms/InputField'
import Button from '../../../components/forms/Button'
import { useUpdateCourseMutation } from '../../../features/api/ApiSliceCourses'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../dtos/Course'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from '../../../components/forms/Spinner'
import { toast } from 'react-toastify'
import Checkbox from '../../../components/forms/Checkbox'

interface FormProps {
    grantsCertificate: boolean
    certificatePrice: number
}

function CertificatesSection({
    data: { grantsCertificate, certificatePrice }
}: {
    data: CourseResponseOwner
}) {
    const { id } = useParams()
    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormProps>()

    useEffect(() => {
        reset({
            grantsCertificate,
            certificatePrice
        })
    }, [])

    const [updateCourse, { isLoading }] = useUpdateCourseMutation()
    return (
        <section>
            <h1 className="text-fs-h1">Description</h1>
            <hr className="border-clr-text1" />
            <form
                className="mt-5"
                onSubmit={handleSubmit(({ grantsCertificate, certificatePrice }) => {
                    updateCourse({
                        request: new CourseUpdateRequest({
                            id: parseInt(id ?? '-1'),
                            grantsCertificate,
                            certificatePrice
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
                    <Checkbox
                        text="Grants Certificate?"
                        label="grantsCertificate"
                        {...register('grantsCertificate')}
                        error={errors.grantsCertificate && 'Field is required'}
                    />
                    <InputField
                        disabled={watch('grantsCertificate') === false}
                        text="Certificate Price"
                        label="certificatePrice"
                        placeholder="49.99"
                        {...register('certificatePrice', { required: true })}
                        error={errors.certificatePrice && 'Field is required'}
                    />
                </fieldset>
                <Button type="submit">Save Changes</Button>
            </form>
            {isLoading && <Spinner />}
        </section>
    )
}

export default CertificatesSection
