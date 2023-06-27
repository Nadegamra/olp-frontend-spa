import { useParams } from 'react-router-dom'
import useUsers from '../../api/UsersApi'
import { useForm } from 'react-hook-form'
import FormField from '../../components/forms/FormField'
import Button from '../../components/forms/Button'
import { useState } from 'react'
import Spinner from '../../components/forms/Spinner'

interface Props {
    password: string
    repeatPassword: string
}

function ChangePasswordPage() {
    const { token } = useParams()
    const { changePassword } = useUsers()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        setError
    } = useForm<Props>()
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    return (
        <section className="p-5 flex flex-col items-center">
            <form
                className="m-auto bg-clr-bg2 flex flex-col p-7 rounded-md mb-7"
                onSubmit={handleSubmit((data) => {
                    setMessage('')
                    setError('root', {
                        type: 'validate',
                        message: ''
                    })
                    changePassword(token ?? '', data.password).then((res) => {
                        if (res) {
                            setMessage('Password changed successfully')
                            return
                        }
                        setError('root', {
                            type: 'validate',
                            message: 'An error has occurred'
                        })
                    })
                })}>
                <header>
                    <h1 className="text-center pb-3 text-fs-h1">Enter new password</h1>
                    <fieldset className="flex flex-col pb-5">
                        <FormField
                            text="Password"
                            label="password"
                            {...register('password', { required: true })}
                        />
                        <p className="h-6 text-clr-error" role="alert">
                            {errors.password && 'Password is required'}
                        </p>
                        <FormField
                            text="Repeat Password"
                            label="repeatPassword"
                            {...register('repeatPassword', {
                                validate: (val) => {
                                    if (val !== watch('password')) {
                                        return "Passwords don't match"
                                    }
                                }
                            })}
                        />
                        <p className="h-6 text-clr-error" role="alert">
                            {errors.repeatPassword?.message}
                        </p>
                    </fieldset>
                    <div className="mx-auto w-max">
                        <Button text="Change Password" type="submit" key={'submit'} />
                    </div>
                </header>
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

export default ChangePasswordPage