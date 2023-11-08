import { useForm } from 'react-hook-form'
import Button from '../../../components/forms/Button'
import { useAddSectionMutation } from '../../../features/api/ApiSliceSections'
import { useParams } from 'react-router-dom'
import { SectionAddRequest } from '../../../dtos/Section'
import { toast } from 'react-toastify'
import InputField from '../../../components/forms/InputField'

interface Props {
    name: string
}

function CourseSectionAddBar() {
    const { courseId } = useParams()
    const {
        handleSubmit,
        register,
        formState: { errors, isLoading }
    } = useForm<Props>()
    const [addSection] = useAddSectionMutation()
    return (
        <>
            <div className="font-bold text-fs-h2 p-3">Add a new section</div>
            <form
                className="px-3 flex flex-row"
                onSubmit={handleSubmit(({ name }) => {
                    addSection([parseInt(courseId ?? '-1'), new SectionAddRequest(name, '')])
                        .unwrap()
                        .then(() => toast.success('Section added successfully'))
                        .catch(() => toast.error('An error has occured'))
                })}>
                <InputField
                    id="name"
                    label="name"
                    disabled={isLoading}
                    type="text"
                    {...register('name', { required: true })}
                    error={errors.name && 'Field is required'}
                />
                <div className="px-2" />
                <Button key={'submit'} type="submit">
                    +
                </Button>
            </form>
        </>
    )
}

export default CourseSectionAddBar
