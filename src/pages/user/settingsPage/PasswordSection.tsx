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
        <section className="p-4 w-[min(800px,50%)]">
            <header className="mb-5">
                <h1 className="text-fs-h1">Password</h1>
                <hr className="border-clr-text1" />
            </header>
            <form
                onSubmit={handleSubmit((data) => {
                    setLoading(true)
                    setMessage('')
                    setError('root', {
                        type: 'validate',
                        message: ''
                    })
                    updatePassword(data.currentPassword, data.newPassword)
                        .then(() => {
                            setMessage('Password updated successfully')
                        })
                        .catch(() => {
                            setError('root', {
                                type: 'validate',
                                message: 'An error has occurred'
                            })
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                })}>
                <fieldset className="w-[min(500px,60%)]">
                    <FormField
                        disabled={loading}
                        id="currentPassword"
                        label="Current Password"
                        text="Current Password"
                        type="password"
                        {...register('currentPassword', { required: true })}
                    />
                    {errors.currentPassword && (
                        <p className="text-clr-error">Current password is required</p>
                    )}
                    <FormField
                        disabled={loading}
                        id="newPassword"
                        label="newPassword"
                        text="New Password"
                        type="password"
                        {...register('newPassword', { required: true })}
                    />
                    {errors.newPassword && (
                        <p className="text-clr-error">New password is required</p>
                    )}
                </fieldset>
                <div className="pt-5">
                    <Button disabled={loading} text="Update password" key={'save1'} type="submit" />
                </div>
            </form>
            {errors.root && (
                <p role="alert" className="text-clr-error" aria-live="polite">
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
