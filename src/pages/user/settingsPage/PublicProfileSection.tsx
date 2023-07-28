import { useForm } from 'react-hook-form'
import Button from '../../../components/forms/Button'
import FormField from '../../../components/forms/InputField'
import { useEffect } from 'react'
import Spinner from '../../../components/forms/Spinner'
import { useAppSelector } from '../../../app/hooks'
import { useUpdateUsernameMutation } from '../../../features/api/ApiSliceUsers'
import { toast } from 'react-toastify'

interface Props {
    username: string
}

function PublicProfileSection() {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<Props>()
    const user = useAppSelector((state) => state.auth.user)

    useEffect(() => {
        const defaultValues: Props = {
            username: user?.username ?? ''
        }
        reset({ ...defaultValues })
    }, [])

    const [updateUsername, { isLoading }] = useUpdateUsernameMutation()

    return (
        <section>
            <header className="mb-5">
                <h1 className="text-fs-h1">Public Profile</h1>
                <hr className="border-clr-text1" />
            </header>
            <form
                aria-label="Form for changing your public profile"
                onSubmit={handleSubmit((data) => {
                    updateUsername(data.username)
                        .unwrap()
                        .then(() => {
                            toast.success('Username updated successfully')
                        })
                        .catch(() => {
                            toast.error('An error has occured')
                        })
                })}>
                <fieldset className="w-[min(500px,60%)]">
                    <FormField
                        id="displayName"
                        label="displayName"
                        text="Display Name"
                        disabled={isLoading}
                        type="text"
                        {...register('username', { required: true })}
                        error={errors.username && 'Field is required'}
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

export default PublicProfileSection
