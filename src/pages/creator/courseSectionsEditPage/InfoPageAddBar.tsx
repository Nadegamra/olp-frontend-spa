import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useAddInfoPageMutation } from '../../../features/api/ApiSliceInfoPages'
import { InfoPageAddRequest } from '../../../dtos/InfoPage'
import InputField from '../../../components/forms/InputField'
import { toast } from 'react-toastify'
import Button from '../../../components/forms/Button'

interface Props {
    name: string
}

function InfoPageAddBar({ sectionId }: { sectionId: number }) {
    const { courseId } = useParams()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isLoading }
    } = useForm<Props>()
    const [addInfoPage] = useAddInfoPageMutation()
    return (
        <form
            className="px-3 flex flex-row"
            onSubmit={handleSubmit(({ name }) => {
                addInfoPage([
                    parseInt(courseId ?? '-1'),
                    sectionId,
                    new InfoPageAddRequest(name, '', true)
                ])
                    .unwrap()
                    .then(() => toast.success('Info page added successfully'))
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
    )
}

export default InfoPageAddBar
