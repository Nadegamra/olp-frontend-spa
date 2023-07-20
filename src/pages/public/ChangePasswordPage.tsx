import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormField from '../../components/forms/InputField'
import Button from '../../components/forms/Button'
import Spinner from '../../components/forms/Spinner'
import { useChangePasswordMutation } from '../../features/api/ApiSliceUsers'
import { toast } from 'react-toastify'

interface Props {
    password: string
    repeatPassword: string
}

function ChangePasswordPage() {
    const { token } = useParams()
    const [changePassword, { isLoading }] = useChangePasswordMutation()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Props>()
    return (
        <section className="p-5 flex flex-col items-center">
            <form
                aria-label="Change Password Form"
                className="m-auto bg-clr-bg2 flex flex-col p-7 rounded-md mb-7"
                onSubmit={handleSubmit((data) => {
                    changePassword({ token: token ?? '', newPassword: data.password })
                        .unwrap()
                        .then(() => {
                            toast.success('Password updated successfully')
                        })
                        .catch((error: any) => {
                            const errObj: object = error.response.data.errors
                            Object.values(errObj).forEach((value) => {
                                toast.error(value)
                            })
                        })
                })}>
                <header>
                    <h1 className="text-center pb-3 text-fs-h1">Enter new password</h1>
                    <fieldset className="flex flex-col pb-5">
                        <FormField
                            text="Password"
                            label="password"
                            type="password"
                            {...register('password', { required: true })}
                        />
                        <p className="h-6 text-clr-error" role="alert">
                            {errors.password && 'Password is required'}
                        </p>
                        <FormField
                            text="Repeat Password"
                            label="repeatPassword"
                            type="password"
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
                        <Button type="submit" key={'submit'}>
                            Change Password
                        </Button>
                    </div>
                </header>
            </form>
            {isLoading && (
                <div className="mx-auto">
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default ChangePasswordPage
