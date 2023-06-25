import { useForm } from 'react-hook-form'
import Button from '../../../components/forms/Button'
import FormField from '../../../components/forms/FormField'
import useAuth from '../../../stores/AuthStore'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/forms/Spinner'
import useUsers from '../../../api/UsersApi'

interface Props {
    username: string
}

function PublicProfileSection() {
    const { profile } = useAuth()
    useEffect(() => {
        profile().then((res) => {
            if (res === false) {
                return
            }
            const defaultValues: Props = {
                username: res?.username ?? ''
            }
            reset({ ...defaultValues })
        })
    }, [])
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        setError
    } = useForm<Props>()
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const { updateUsername } = useUsers()

    return (
        <section>
            <header className="mb-5">
                <h1 className="text-fs-h1">Public Profile</h1>
                <hr className="border-clr-text1" />
            </header>
            <form
                onSubmit={handleSubmit((data) => {
                    setFormLoading(true)
                    setMessage('')
                    setError('root', {
                        type: 'validate',
                        message: ''
                    })
                    updateUsername(data.username)
                        .then(() => {
                            setMessage('Username updated successfully')
                            setError('root', {
                                type: 'validate',
                                message: ''
                            })
                        })
                        .catch(() => {
                            setMessage('')
                            setError('root', {
                                type: 'validate',
                                message: 'An error has occurred'
                            })
                        })
                        .finally(() => {
                            setFormLoading(false)
                        })
                })}>
                <fieldset className="w-[min(500px,60%)]">
                    <FormField
                        id="username"
                        label="Display Name"
                        text="Display Name"
                        disabled={formLoading}
                        {...register('username', { required: true })}
                    />
                </fieldset>
                <div className="pt-5">
                    <Button text="Update profile" key={'save1'} type="submit" />
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
            {formLoading && (
                <div className="mx-auto">
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default PublicProfileSection
