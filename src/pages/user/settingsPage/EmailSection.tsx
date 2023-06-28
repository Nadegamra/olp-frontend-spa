import { useState } from 'react'
import useAuth from '../../../stores/AuthStore'
import { useForm } from 'react-hook-form'
import FormField from '../../../components/forms/FormField'
import Button from '../../../components/forms/Button'
import useUsers from '../../../api/UsersApi'
import Spinner from '../../../components/forms/Spinner'

interface Props {
    newEmail: string
}

function EmailSection() {
    const { user } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<Props>()
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const { sendEmailChangeToken } = useUsers()
    return (
        <section>
            <header className="mb-5">
                <h1 className="text-fs-h1">Email</h1>
                <hr className="border-clr-text1" />
            </header>
            <label htmlFor="currentEmail" className="font-semibold">
                Current Email
            </label>
            <div id="currentEmail" className="pb-3 pl-3 h-9">
                {user?.email}
            </div>
            <form
                aria-label="Form for Emailing a link to change your email address"
                onSubmit={handleSubmit((data) => {
                    setLoading(true)
                    sendEmailChangeToken(data.newEmail)
                        .then((res) => {
                            if (res === false) {
                                setError('newEmail', {
                                    type: 'manual',
                                    message: 'Email already in use'
                                })
                                setLoading(false)
                                return
                            }
                            setMessage(
                                'A confirmation email has been sent to your new email address'
                            )
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                })}>
                <fieldset className="w-[min(500px,60%)] mb-5">
                    <FormField
                        disabled={loading}
                        id="newEmail"
                        label="New Email"
                        text="New Email"
                        type="email"
                        {...register('newEmail', { required: true })}
                    />
                    <p className="text-clr-error h-6">{errors.newEmail && 'Field is required'}</p>
                </fieldset>
                <Button disabled={loading} key={'save1'} type="submit">
                    Send Confirmation Email
                </Button>
            </form>
            {errors.root && (
                <span role="alert" className="text-clr-error" aria-live="polite">
                    {errors.root.message}
                </span>
            )}
            {message !== '' && (
                <span role="alert" className="text-clr-success" aria-live="polite">
                    {message}
                </span>
            )}
            {loading && (
                <div className="mx-auto">
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default EmailSection
