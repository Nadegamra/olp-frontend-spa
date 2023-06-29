import { set, useForm } from 'react-hook-form'
import FormField from '../../../components/forms/FormField'
import Button from '../../../components/forms/Button'
import { useState } from 'react'
import useUsers from '../../../api/UsersApi'
import Spinner from '../../../components/forms/Spinner'

interface UpdatePasswordProps {
    currentPassword: string
    newPassword: string
}

function PasswordSection() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<UpdatePasswordProps>()
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { updatePassword } = useUsers()
    return (
        <section>
            <header className="mb-5">
                <h1 className="text-fs-h1">Password</h1>
                <hr className="border-clr-text1" />
            </header>
            <form
                aria-label="Form for changing your password"
                onSubmit={handleSubmit((data) => {
                    setLoading(true)
                    setMessage('')
                    setError('root', {
                        type: 'validate',
                        message: ''
                    })
                    updatePassword(data.currentPassword, data.newPassword)
                        .then((res) => {
                            if (res === true) {
                                setMessage('Password updated successfully')
                            } else if (res === false) {
                                setError('root', {
                                    type: 'validate',
                                    message: 'An error has occurred'
                                })
                            } else {
                                setError('root', {
                                    type: 'validate',
                                    message: res
                                })
                            }
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                })}>
                <fieldset className="w-[min(500px,60%)]">
                    <FormField
                        disabled={loading}
                        id="currentPassword"
                        label="currentPassword"
                        text="Current Password"
                        type="password"
                        {...register('currentPassword', { required: true })}
                    />
                    <p className="text-clr-error h-6">
                        {errors.currentPassword && 'Field is required'}
                    </p>
                    <FormField
                        disabled={loading}
                        id="newPassword"
                        label="newPassword"
                        text="New Password"
                        type="password"
                        {...register('newPassword', { required: true })}
                    />
                    <p className="text-clr-error h-6">
                        {errors.newPassword && 'Field is required'}
                    </p>
                </fieldset>
                <div className="pt-2">
                    <Button disabled={loading} key={'save1'} type="submit">
                        Update Password
                    </Button>
                </div>
            </form>
            {errors.root && (
                <p role="alert" className="text-clr-error whitespace-pre-wrap" aria-live="polite">
                    {errors.root.message}
                </p>
            )}
            {message !== '' && (
                <p role="alert" className="text-clr-success" aria-live="polite">
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

export default PasswordSection
