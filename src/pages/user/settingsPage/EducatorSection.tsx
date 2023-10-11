import { useForm } from 'react-hook-form'
import Button from '../../../components/forms/Button'
import Spinner from '../../../components/forms/Spinner'
import {
    useGetCreatorProfileQuery,
    useUpdateCreatorMutation
} from '../../../features/api/ApiSliceCreators'
import { toast } from 'react-toastify'
import InputField from '../../../components/forms/InputField'
import { CreatorUpdateRequest } from '../../../dtos/Creator'
import { useEffect } from 'react'

interface Props {
    bio: string
    website: string
}

function EducatorSection() {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<Props>()

    const [updateCreator, { isLoading }] = useUpdateCreatorMutation()

    const { data, isSuccess } = useGetCreatorProfileQuery(undefined)

    useEffect(() => {
        const defaultValues: Props = {
            bio: data?.bio ?? '',
            website: data?.website ?? ''
        }
        reset({ ...defaultValues })
    }, [isSuccess])
    return (
        <section>
            <header className="mb-5">
                <h1 className="text-fs-h1">Educator Profile</h1>
                <hr className="border-clr-text1" />
            </header>
            <form
                aria-label="Form for changing your public profile"
                onSubmit={handleSubmit(({ bio, website }) => {
                    updateCreator(new CreatorUpdateRequest(bio, website))
                        .unwrap()
                        .then(() => {
                            toast.success('Profile updated successfully')
                        })
                        .catch(() => {
                            toast.error('An error has occured')
                        })
                })}>
                <fieldset className="w-[min(500px,60%)]">
                    <InputField
                        id="bio"
                        label="bio"
                        text="About Me"
                        disabled={isLoading}
                        type="text"
                        {...register('bio', { required: true })}
                        error={errors.bio && 'Field is required'}
                    />
                    <InputField
                        id="website"
                        label="website"
                        text="Website"
                        disabled={isLoading}
                        type="text"
                        {...register('website', { required: true })}
                        error={errors.website && 'Field is required'}
                    />
                </fieldset>
                <div className="pt-5">
                    <Button key={'save1'} type="submit">
                        Update Profile
                    </Button>
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

export default EducatorSection
