import { useForm } from 'react-hook-form'
import useUsers from '../../api/UsersApi'
import Button from '../../components/forms/Button'
import FormField from '../../components/forms/FormField'
import { useState } from 'react'
import Spinner from '../../components/forms/Spinner'

interface Props {
    email: string
}

function SendPasswordResetPage() {
    const { sendPasswordResetToken } = useUsers()
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError
    } = useForm<Props>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    return (
        <section className="p-5 flex flex-col items-center">
            <form
                aria-label="Send Password Reset Form"
                className="m-auto bg-clr-bg2 flex flex-col p-7 rounded-md mb-7"
                onSubmit={handleSubmit((data) => {
                    setLoading(true)
                    sendPasswordResetToken(data.email).then((res) => {
                        setLoading(false)
                        if (res) {
                            setMessage('Email sent')
                            return
                        }
                        setError('root', {
                            type: 'validate',
                            message: 'Email not found'
                        })
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
                    />
                </fieldset>
                <div className="w-max m-auto">
                    <Button type="submit" key={'submit'}>
                        Send Email
                    </Button>
                </div>
            </form>
            {errors.root && (
                <p role="alert" className="text-clr-error text-center" aria-live="polite">
                    {errors.root.message}
                </p>
            )}
            {message !== '' && (
                <p role="alert" className="text-clr-success text-center" aria-live="polite">
                    {message}
                </p>
            )}
            {loading && (
                <div className="mx-auto">
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default SendPasswordResetPage
