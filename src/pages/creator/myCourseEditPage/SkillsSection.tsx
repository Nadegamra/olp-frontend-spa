import { useForm } from 'react-hook-form'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../dtos/Course'
import { Difficulty, DifficultyRadioInfo } from '../../../dtos/enums/Difficulty'
import { useGetCourseQuery, useUpdateCourseMutation } from '../../../features/api/ApiSliceCourses'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import RadioArray from '../../../components/forms/RadioArray'
import Button from '../../../components/forms/Button'
import Spinner from '../../../components/forms/Spinner'
import { useGetSkillsSuggestionsQuery } from '../../../features/api/ApiSliceSkill'
import InputField from '../../../components/forms/InputField'
import Modal from '../../../components/layout/Modal'

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
    const {
        data: skills,
        isFetching: isFetchingSkills,
        isSuccess: isSuccessSkills
    } = useGetSkillsSuggestionsQuery(search)
    // const { data: course } = useGetCourseQuery(parseInt(id ?? '-1'))

    useEffect(() => {
        reset({
            difficulty
        })
    }, [skills, isFetchingSkills])

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
            <div className="block mb-2 font-medium">Gained Skills</div>
            {/* TODO: Display current course skills */}
            <Modal toggleButtonText="Add Skills">
                <div className="bg-clr-bg3 p-10 rounded-xl border">
                    <InputField
                        text={'Search skills'}
                        label={'Search'}
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearch(e.target.value)
                        }
                    />
                    <div className="border border-clr-text3 rounded-md p-3 grid grid-cols-1 grid-rows-10 gap-3 auto-cols-max">
                        {!isFetchingSkills &&
                            isSuccessSkills &&
                            (skills?.length > 0 ? (
                                skills?.map((sugg) => (
                                    <div className="flex p-3 bg-clr-bg2" key={sugg.id}>
                                        <span>{sugg.name}</span>
                                        <span className="flex-1" />
                                        <span className="material-symbols-outlined">add</span>
                                    </div>
                                ))
                            ) : (
                                <div>No results found</div>
                            ))}
                    </div>
                </div>
            </Modal>
            <div className="block mb-2 font-medium">Requirements</div>
            {/* TODO: Display current required course skills */}
        </section>
    )
}

export default SkillsSection
