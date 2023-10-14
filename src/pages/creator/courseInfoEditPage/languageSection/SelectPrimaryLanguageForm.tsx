import { useForm } from 'react-hook-form'
import {
    useGetCourseLanguageListQuery,
    useSetCoursePrimaryLanguageMutation
} from '../../../../features/api/ApiSliceCourseLanguages'
import { CourseLanguageSetPrimaryRequest } from '../../../../dtos/CourseLanguage'
import { toast } from 'react-toastify'
import Select, { SelectInfo } from '../../../../components/forms/Select'
import Button from '../../../../components/forms/Button'
import { useParams } from 'react-router-dom'

interface FormProps {
    languageId: number
}
function SelectPrimaryLanguageForm() {
    const { id } = useParams()
    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormProps>()
    const { isSuccess: isSuccessLanguages, data: courseLanguages } = useGetCourseLanguageListQuery(
        parseInt(id ?? '-1')
    )
    const [setPrimaryLanguage] = useSetCoursePrimaryLanguageMutation()
    return (
        <div>
            <div>Select primary language</div>
            <div className="max-w-md" id="select">
                <form
                    className="mb-2 block"
                    onSubmit={handleSubmit(({ languageId }) => {
                        setPrimaryLanguage(
                            new CourseLanguageSetPrimaryRequest(parseInt(id ?? '-1'), languageId)
                        )
                            .unwrap()
                            .then(() => {
                                toast.success('Primary course language updated successfully')
                            })
                            .catch(() => {
                                toast.error('An error has occured while updating')
                            })
                    })}>
                    <fieldset>
                        {isSuccessLanguages && (
                            <Select
                                id="languages"
                                selectInfo={courseLanguages!.map(
                                    (x) => new SelectInfo(x.language.name, x.language.id)
                                )}
                                {...register('languageId', { required: true })}
                                error={errors.languageId && 'Field is required'}
                            />
                        )}
                    </fieldset>
                    <Button type="submit">Save Changes</Button>
                </form>
            </div>
        </div>
    )
}

export default SelectPrimaryLanguageForm
