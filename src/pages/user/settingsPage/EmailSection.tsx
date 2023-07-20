import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormField from '../../../components/forms/InputField'
import Button from '../../../components/forms/Button'
import Spinner from '../../../components/forms/Spinner'
import { useAppSelector } from '../../../app/hooks'
import { useSendEmailChangeTokenMutation } from '../../../features/api/ApiSliceUsers'

interface Props {
    newEmail: string
}

function EmailSection() {
    const user = useAppSelector((state) => state.auth.user)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<Props>()

    const [message, setMessage] = useState<string>('')
    const [sendEmailChangeToken, { isLoading }] = useSendEmailChangeTokenMutation()

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
                    sendEmailChangeToken(data.newEmail)
                        .unwrap()
                        .then((res) => {
                            setMessage(
                                'A confirmation email has been sent to your new email address'
                            )
                        })
                        .catch((error) => {
                            if (error === false) {
                                setError('root', {
                                    type: 'validate',
                                    message: 'Email already in use'
                                })
                                return
                            } else {
                                setError('root', {
                                    type: 'validate',
                                    message: error
                                })
                            }
                        })
                })}>
                <fieldset className="w-[min(500px,60%)] mb-5">
                    <FormField
                        disabled={isLoading}
                        id="newEmail"
                        label="New Email"
                        text="New Email"
                        type="email"
                        {...register('newEmail', { required: true })}
                    />
                    <p className="text-clr-error h-6">{errors.newEmail && 'Field is required'}</p>
                </fieldset>
                <Button disabled={isLoading} key={'save1'} type="submit">
                    Send Confirmation Email
                </Button>
            </form>
            {errors.root && (
                <span
                    role="alert"
                    className="text-clr-error whitespace-pre-wrap"
                    aria-live="polite">
                    {errors.root.message}
                </span>
            )}
            {message !== '' && (
                <span role="alert" className="text-clr-success" aria-live="polite">
                    {message}
                </span>
            )}
            {isLoading && (
                <div className="mx-auto">
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default EmailSection
