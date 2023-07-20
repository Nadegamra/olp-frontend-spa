import { useForm } from 'react-hook-form'
import FormField from '../../../components/forms/InputField'
import Button from '../../../components/forms/Button'
import { useState } from 'react'
import Spinner from '../../../components/forms/Spinner'
import { useUpdatePasswordMutation } from '../../../features/api/ApiSliceUsers'
import { toast } from 'react-toastify'

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
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

    return (
        <section>
            <header className="mb-5">
                <h1 className="text-fs-h1">Password</h1>
                <hr className="border-clr-text1" />
            </header>
            <form
                aria-label="Form for changing your password"
                onSubmit={handleSubmit((data) => {
                    updatePassword({
                        oldPassword: data.currentPassword,
                        newPassword: data.newPassword
                    })
                        .unwrap()
                        .then(() => {
                            toast.success('Password updated successfully')
                        })
                        .catch((error) => {
                            if (error === undefined) {
                                toast.error('An error has occured')
                                setError('root', {
                                    message: 'error'
                                })
                            } else {
                                const errObj: object = (error as any).data.errors
                                const errArr = Object.values(errObj).reduce((acc, curr) => {
                                    return acc.concat(curr)
                                }, [])
                                for (const val of errArr) {
                                    toast.error(val)
                                }
                            }
                        })
                })}>
                <fieldset className="w-[min(500px,60%)]">
                    <FormField
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                    <Button disabled={isLoading} key={'save1'} type="submit">
                        Update Password
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

export default PasswordSection
