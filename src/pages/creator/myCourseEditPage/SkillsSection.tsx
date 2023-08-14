import { useForm } from 'react-hook-form'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../dtos/Course'
import { Difficulty, DifficultyRadioInfo } from '../../../dtos/enums/Difficulty'
import { useUpdateCourseMutation } from '../../../features/api/ApiSliceCourses'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import RadioArray from '../../../components/forms/RadioArray'
import Button from '../../../components/forms/Button'
import Spinner from '../../../components/forms/Spinner'
import { useGetSkillsSuggestionsQuery } from '../../../features/api/ApiSliceSkill'
import InputField from '../../../components/forms/InputField'

interface Props {
    difficulty: Difficulty
}

function SkillsSection({ data: { difficulty } }: { data: CourseResponseOwner }) {
    const { id } = useParams()
    const [search, setSearch] = useState<string>('')
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<Props>()
    const { data, isFetching } = useGetSkillsSuggestionsQuery(search)
    useEffect(() => {
        reset({
            difficulty
        })
        if (!isFetching) {
            console.log(data)
        }
    }, [data, isFetching])

    const [updateCourse, { isLoading }] = useUpdateCourseMutation()
    return (
        <section>
            <h1 className="text-fs-h1">Skills</h1>
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
            <InputField
                text={'Search'}
                label={'Search'}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            {!isFetching && data?.map((sugg) => <div key={sugg.id}>{sugg.name}</div>)}
        </section>
    )
}

export default SkillsSection
