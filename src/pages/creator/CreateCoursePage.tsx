import { useForm } from 'react-hook-form'
import FormField from '../../components/forms/InputField'
import FormTextarea from '../../components/forms/TextArea'
import { CourseCreateRequest } from '../../dtos/Course'
import Radio from '../../components/forms/Radio'

function CreateCoursePage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isLoading }
    } = useForm<CourseCreateRequest>()
    return (
        <section className="flex flex-col items-center content-center">
            <form className="bg-clr-bg2 my-10 p-10 rounded-md">
                <header className="pb-10">
                    <h1 className="text-fs-h1 text-center">Create new course</h1>
                </header>
                <fieldset>
                    <div className="flex flex-row pb-5">
                        <div className="mr-2">
                            <FormField
                                placeholder="Python Basics"
                                label="name"
                                text="Name"
                                type="text"
                                {...register('name', { required: true })}
                            />
                        </div>
                        <div>
                            <FormField
                                placeholder="30"
                                label="lengthInDays"
                                text="Length In Days"
                                type="number"
                                {...register('lengthInDays', { required: true })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row pb-5">
                        <div className="mr-2 flex-1">
                            <FormField
                                placeholder="39.99"
                                label="price"
                                text="Course Price"
                                type="number"
                                {...register('price', { required: true })}
                            />
                        </div>
                        <div className="flex-1">
                            <FormTextarea
                                placeholder="Short Description"
                                label="shortDesc"
                                text="Short Description"
                                {...register('shortDescription', { required: true })}
                            />
                        </div>
                    </div>
                    <div className="pb-5">
                        <FormTextarea
                            placeholder="Detailed Description"
                            label="detailedDesc"
                            text="Detailed Description"
                            {...register('detailedDescription', { required: true })}
                        />
                    </div>
                    <div className="flex flex-row pb-5">
                        <div className="flex-[3]">
                            <h2 className="text-fs-h2 text-center block pb-1">Activity Format</h2>
                            <div className="flex flex-row pb-4">
                                <div className="text-center flex-1 px-1">
                                    <Radio
                                        label="Online"
                                        value={0}
                                        {...register('activityFormat')}
                                    />
                                </div>
                                <div className="text-center flex-1 px-1">
                                    <Radio label="Live" value={0} {...register('activityFormat')} />
                                </div>
                                <div className="text-center flex-1">
                                    <Radio
                                        label="Mixed"
                                        value={0}
                                        {...register('activityFormat')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-1 border-l" />
                        <div className="flex-[2]">
                            <h2 className="text-fs-h2 text-center block pb-1">Schedule Type</h2>
                            <div className="flex flex-row pb-4">
                                <div className="text-center flex-1 px-1">
                                    <Radio label="Fixed" value={0} {...register('scheduleType')} />
                                </div>
                                <div className="text-center flex-1">
                                    <Radio
                                        label="Flexible"
                                        value={0}
                                        {...register('scheduleType')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-fs-h2 text-center block pb-1">Difficulty Level</h2>
                    <div className="flex flex-row">
                        <div className="text-center flex-1 pb-4">
                            <Radio label="Beginner" value={0} {...register('difficulty')} />
                        </div>
                        <div className="text-center flex-1 px-1">
                            <Radio label="Intermediate" value={0} {...register('difficulty')} />
                        </div>
                        <div className="text-center flex-1 px-1">
                            <Radio label="Advanced" value={0} {...register('difficulty')} />
                        </div>
                        <div className="text-center flex-1 px-1">
                            <Radio label="Expert" value={0} {...register('difficulty')} />
                        </div>
                        <div className="text-center flex-1">
                            <Radio label="Master" value={0} {...register('difficulty')} />
                        </div>
                    </div>

                    <div className="flex flex-row mb-5 h-16">
                        <div className="flex-1">
                            <label className="block" htmlFor="gr_cert">
                                Grants Certificate?
                            </label>
                            <input
                                className="bg-clr-bg3 rounded-sm"
                                type="checkbox"
                                id="gr_cert"
                                {...register('grantsCertificate', { required: true })}
                            />
                        </div>
                        {watch('grantsCertificate') && (
                            <div className="flex-1">
                                <FormField
                                    placeholder="59.99"
                                    label="price"
                                    text="Certificate Price"
                                    type="number"
                                    {...register('certificatePrice', { required: true })}
                                />
                            </div>
                        )}
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

export default CreateCoursePage
