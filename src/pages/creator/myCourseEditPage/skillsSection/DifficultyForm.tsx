import { useForm } from 'react-hook-form'
import { useUpdateCourseMutation } from '../../../../features/api/ApiSliceCourses'
import { Difficulty, DifficultyRadioInfo } from '../../../../dtos/enums/Difficulty'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../../dtos/Course'
import { toast } from 'react-toastify'
import RadioArray from '../../../../components/forms/RadioArray'
import { useParams } from 'react-router-dom'
import Button from '../../../../components/forms/Button'
import Spinner from '../../../../components/forms/Spinner'
import { useEffect } from 'react'

interface Props {
    difficulty: Difficulty
}

function DifficultyForm({ data: { difficulty } }: { data: CourseResponseOwner }) {
    const { id } = useParams()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<Props>()
    const [updateCourse, { isLoading: isLoadingCourseUpdate }] = useUpdateCourseMutation()

    useEffect(() => {
        reset({
            difficulty
        })
    }, [])

    return (
        <>
            <form
                className="mt-5"
                onSubmit={handleSubmit(({ difficulty }) => {
                    updateCourse({
                        request: new CourseUpdateRequest({
                            id: parseInt(id ?? '-1'),
                            difficulty
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
                    <RadioArray
                        headerText="Difficulty"
                        radiosInfo={DifficultyRadioInfo}
                        {...register('difficulty', { required: true })}
                        error={errors.difficulty && 'Field is required'}
                        defaultValue={Difficulty[difficulty]}
                    />
                </fieldset>
                <Button type="submit">Save Changes</Button>
            </form>
            {isLoadingCourseUpdate && <Spinner />}
        </>
    )
}

export default DifficultyForm
