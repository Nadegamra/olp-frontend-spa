import { useEffect, useState } from 'react'
import useAuth from '../../../stores/AuthStore'
import { User } from '../../../dtos/User'
import { useForm } from 'react-hook-form'
import FormField from '../../../components/forms/FormField'
import Button from '../../../components/forms/Button'
import useUsers from '../../../api/UsersApi'
import Spinner from '../../../components/forms/Spinner'

interface Props {
    newEmail: string
}

function EmailSection() {
    const [user, setUser] = useState<User | undefined>(undefined)
    const { profile } = useAuth()
    useEffect(() => {
        profile().then((res) => {
            if (res === false) {
                return
            }
            setUser(res)
        })
    }, [])
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
        <section className="p-4 w-[min(800px,50%)]">
            <header className="mb-5">
                <h1 className="text-fs-h1">Email</h1>
                <hr className="border-clr-text1" />
            </header>
            <label htmlFor="currentEmail" className="font-semibold">
                Current Email
            </label>
            <p id="currentEmail" className="pb-3 pl-3 h-9">
                {user?.email}
            </p>
            <form
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
                </fieldset>
                <Button
                    disabled={loading}
                    text="Send Confirmation Email"
                    key={'save1'}
                    type="submit"
                />
            </form>
            {errors.root && (
                <output role="alert" className="text-clr-error" aria-live="polite">
                    {errors.root.message}
                </output>
            )}
            {message !== '' && (
                <output role="alert" className="text-clr-success" aria-live="polite">
                    {message}
                </output>
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
