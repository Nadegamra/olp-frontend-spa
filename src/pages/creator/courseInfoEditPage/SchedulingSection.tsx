import { useForm } from 'react-hook-form'
import InputField from '../../../components/forms/InputField'
import Button from '../../../components/forms/Button'
import { useUpdateCourseMutation } from '../../../features/api/ApiSliceCourses'
import { CourseResponseOwner, CourseUpdateRequest } from '../../../dtos/Course'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from '../../../components/forms/Spinner'
import { toast } from 'react-toastify'
import { ActivityFormat, ActivityFormatRadioInfo } from '../../../dtos/enums/ActivityFormat'
import { ScheduleRadioInfo, ScheduleType } from '../../../dtos/enums/ScheduleType'
import RadioArray from '../../../components/forms/RadioArray'

interface FormProps {
    lengthInDays: number
    activityFormat: ActivityFormat
    scheduleType: ScheduleType
}

function SchedulingSection({
    data: { lengthInDays, activityFormat, scheduleType }
}: {
    data: CourseResponseOwner
}) {
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormProps>()

    useEffect(() => {
        reset({
            lengthInDays,
            activityFormat,
            scheduleType
        })
    }, [])

    const [updateCourse, { isLoading }] = useUpdateCourseMutation()
    return (
        <section>
            <h1 className="text-fs-h1">Scheduling</h1>
            <hr className="border-clr-text1" />
            <form
                className="mt-5"
                onSubmit={handleSubmit(({ lengthInDays, activityFormat, scheduleType }) => {
                    updateCourse({
                        request: new CourseUpdateRequest({
                            id: parseInt(id ?? '-1'),
                            lengthInDays,
                            activityFormat,
                            scheduleType
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
                        text="Length In Days"
                        label="lengthInDays"
                        placeholder="30"
                        {...register('lengthInDays', { required: true })}
                        error={errors.lengthInDays && 'Field is required'}
                    />
                    <RadioArray
                        headerText="Activity Format"
                        radiosInfo={ActivityFormatRadioInfo}
                        {...register('activityFormat', { required: true })}
                        error={errors.activityFormat && 'Field is required'}
                        defaultValue={ActivityFormat[activityFormat]}
                    />
                    <RadioArray
                        headerText="ScheduleType"
                        radiosInfo={ScheduleRadioInfo}
                        {...register('scheduleType', { required: true })}
                        error={errors.scheduleType && 'Field is required'}
                        defaultValue={ScheduleType[scheduleType]}
                    />
                </fieldset>
                <Button type="submit">Save Changes</Button>
            </form>
            {isLoading && <Spinner />}
        </section>
    )
}

export default SchedulingSection
