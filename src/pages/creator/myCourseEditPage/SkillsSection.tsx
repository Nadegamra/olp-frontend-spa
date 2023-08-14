import { useForm } from 'react-hook-form'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../dtos/Course'
import { Difficulty, DifficultyRadioInfo } from '../../../dtos/enums/Difficulty'
import { useUpdateCourseMutation } from '../../../features/api/ApiSliceCourses'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import RadioArray from '../../../components/forms/RadioArray'
import Button from '../../../components/forms/Button'
import Spinner from '../../../components/forms/Spinner'

interface Props {
    difficulty: Difficulty
}

function SkillsSection({ data: { difficulty } }: { data: CourseResponseOwner }) {
    const { id } = useParams()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<Props>()

    useEffect(() => {
        reset({
            difficulty
        })
    }, [])

    const [updateCourse, { isLoading }] = useUpdateCourseMutation()
    return (
        <section>
            <h1 className="text-fs-h1">Scheduling</h1>
            <hr className="border-clr-text1" />
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
            {isLoading && <Spinner />}
        </section>
    )
}

export default SkillsSection
