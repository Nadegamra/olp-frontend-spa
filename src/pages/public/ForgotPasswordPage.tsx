import { useForm } from 'react-hook-form'
import Button from '../../components/forms/Button'
import FormField from '../../components/forms/InputField'
import Spinner from '../../components/forms/Spinner'
import { useSendPasswordResetTokenMutation } from '../../features/api/ApiSliceUsers'
import { toast } from 'react-toastify'

interface Props {
    email: string
}

function SendPasswordResetPage() {
    const [sendPasswordResetToken, { isLoading }] = useSendPasswordResetTokenMutation()
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<Props>()

    return (
        <section className="p-5 flex flex-col items-center">
            <form
                aria-label="Send Password Reset Form"
                className="m-auto bg-clr-bg2 flex flex-col p-7 rounded-md mb-7"
                onSubmit={handleSubmit((data) => {
                    sendPasswordResetToken(data.email)
                        .unwrap()
                        .then(() => {
                            toast.success('Email sent')
                        })
                        .catch(() => {
                            toast.error('Email not found')
                        })
                })}>
                <header className="pb-4">
                    <h1 className="text-fs-h1 text-center">Forgot Password</h1>
                </header>
                <fieldset className="flex flex-col pb-7">
                    <FormField
                        text="Email"
                        label="email"
                        placeholder="email@example.com"
                        type="email"
                        {...register('email', { required: true })}
                        error={errors.email && 'Field is required'}
                    />
                </fieldset>
                <div className="w-max m-auto">
                    <Button type="submit" key={'submit'}>
                        Send Email
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

export default SendPasswordResetPage
