import { useForm } from 'react-hook-form'
import FormField from '../../components/forms/InputField'
import FormTextarea from '../../components/forms/TextArea'
import { CourseCreateRequest } from '../../dtos/Course'
import Radio from '../../components/forms/Radio'
import Button from '../../components/forms/Button'
import { useCreateCourseMutation } from '../../features/api/ApiSliceCourses'
import { toast } from 'react-toastify'
import Spinner from '../../components/forms/Spinner'
import RadioArray from '../../components/forms/RadioArray'
import { ScheduleRadioInfo } from '../../dtos/enums/ScheduleType'
import { DifficultyRadioInfo } from '../../dtos/enums/Difficulty'
import { ActivityFormatRadioInfo } from '../../dtos/enums/ActivityFormat'
import Checkbox from '../../components/forms/Checkbox'

function CreateCoursePage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<CourseCreateRequest>()

    const [createCourse, { isLoading }] = useCreateCourseMutation()

    return (
        <section className="flex flex-col items-center content-center">
            <form
                className="bg-clr-bg2 my-10 p-10 rounded-md"
                onSubmit={handleSubmit((data) => {
                    createCourse(data)
                        .unwrap()
                        .then(() => {
                            toast.success('Course created successfully')
                        })
                        .catch(() => {
                            toast.error('An error has occured')
                        })
                })}>
                <header className="pb-10">
                    <h1 className="text-fs-h1 text-center">Create new course</h1>
                </header>
                <fieldset className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    <div className="mr-2">
                        <FormField
                            placeholder="Python Basics"
                            label="name"
                            text="Name"
                            type="text"
                            {...register('name', { required: true })}
                            error={errors.name && 'Field is required'}
                        />
                    </div>
                    <div>
                        <FormField
                            placeholder={30}
                            label="lengthInDays"
                            text="Length In Days"
                            type="number"
                            {...register('lengthInDays', { required: true })}
                            error={errors.lengthInDays && 'Field is required'}
                        />
                    </div>
                    <div className="mr-2 flex-1">
                        <FormField
                            placeholder={39.99}
                            label="price"
                            text="Course Price"
                            step="0.01"
                            type="number"
                            {...register('price', { required: true })}
                            error={errors.price && 'Field is required'}
                        />
                    </div>
                    <div className="flex-1">
                        <FormTextarea
                            placeholder="Short Description"
                            label="shortDesc"
                            text="Short Description"
                            {...register('shortDescription', { required: true })}
                            error={errors.shortDescription && 'Field is required'}
                        />
                    </div>
                    <div className="pb-5">
                        <FormTextarea
                            placeholder="Detailed Description"
                            label="detailedDesc"
                            text="Detailed Description"
                            {...register('detailedDescription', { required: true })}
                            error={errors.detailedDescription && 'Field is required'}
                        />
                    </div>
                    <div>
                        <RadioArray
                            headerText="Activity Format"
                            radiosInfo={ActivityFormatRadioInfo}
                            error={errors.activityFormat && 'Field is required'}
                            {...register('activityFormat', { required: true })}
                        />
                    </div>
                    <div>
                        <RadioArray
                            headerText="Schedule Type"
                            radiosInfo={ScheduleRadioInfo}
                            error={errors.scheduleType && 'Field is required'}
                            {...register('scheduleType', { required: true })}
                        />
                    </div>
                    <div>
                        <RadioArray
                            headerText="Difficulty Level"
                            radiosInfo={DifficultyRadioInfo}
                            error={errors.difficulty && 'Field is required'}
                            {...register('difficulty', { required: true })}
                        />
                    </div>
                    <div className="flex flex-row">
                        <div className="pr-5">
                            <Checkbox
                                text="Grants Certificate?"
                                label="gr_cert"
                                {...register('grantsCertificate')}
                            />
                        </div>
                        <div className={watch('grantsCertificate') ? 'flex-1' : 'flex-1 invisible'}>
                            <FormField
                                placeholder="59.99"
                                label="price"
                                text="Certificate Price"
                                step="0.01"
                                type="number"
                                {...register('certificatePrice')}
                            />
                        </div>
                    </div>
                </fieldset>
                <div className="text-center">
                    <Button type="submit">Create</Button>
                </div>
            </form>
            {isLoading && (
                <div className="mx-auto">
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default CreateCoursePage
