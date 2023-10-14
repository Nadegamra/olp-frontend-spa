import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useSetCourseImageMutation } from '../../../../features/api/ApiSliceImages'
import { toast } from 'react-toastify'
import Button from '../../../../components/forms/Button'
import Spinner from '../../../../components/forms/Spinner'
import { SetCourseImageRequest } from '../../../../dtos/CourseImage'
import FileUploadField from '../../../../components/forms/FileUploadField'

interface FormProps {
    images: FileList
}

function CourseImageUpdateForm() {
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm<FormProps>()

    useEffect(() => {
        reset({})
    }, [])
    const [setCourseImage, { isLoading }] = useSetCourseImageMutation()

    const handleChange = (e: any) => {
        setValue('images', e.target.files) // you get all the files object here
    }

    return (
        <>
            <form
                className="mt-5"
                onSubmit={handleSubmit(({ images }) => {
                    console.log(images[0])
                    let formData = new FormData()
                    formData.append('image', images[0], images[0].name)

                    setCourseImage(new SetCourseImageRequest(parseInt(id ?? '-1'), formData))
                        .unwrap()
                        .then(() => {
                            toast.success('Course updated successfully!')
                        })
                        .catch(() => {
                            toast.error('An error has occured while update course info')
                        })
                })}>
                <fieldset className="w-[min(500px,60%)]">
                    <FileUploadField
                        label="name"
                        placeholder="Name"
                        error={errors.images && 'Field is required'}
                        onChange={handleChange}
                    />
                </fieldset>
                <Button type="submit">Save Changes</Button>
            </form>
            {isLoading && <Spinner />}
        </>
    )
}

export default CourseImageUpdateForm
