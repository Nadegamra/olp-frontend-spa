import { useForm } from 'react-hook-form'
import useAuth from '../stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import { LoginRequestDTO } from '../dtos/User'

interface ILoginInfo {
    email: string
    password: string
    repeatPassword: string
}

function RegisterPage() {
    const {
        register,
        watch,
        formState: { isLoading, errors },
        handleSubmit,
        setError
    } = useForm<ILoginInfo>()

    const { login } = useAuth()
    const navigate = useNavigate()
    return (
        <section className="p-5 flex items-center">
            <form
                className="m-auto bg-bg-secondary flex flex-col p-7 rounded-md"
                onSubmit={handleSubmit(async (data) => {
                    const res = await login(new LoginRequestDTO(data.email, data.password, false))
                    if (res) {
                        navigate('/profile')
                        return
                    }
                    setError('root', {
                        type: 'validate',
                        message: 'Login credentials are incorrect'
                    })
                })}>
                <h1 className="text-center pb-3 text-fs-h1">Login</h1>
                <fieldset className="flex flex-col">
                    <legend className="sr-only">Login details</legend>
                    <label htmlFor="email">
                        Email
                        <input
                            className="block bg-bg-tertiary text-t-primary p-2 rounded-md"
                            type="email"
                            id="email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className="text-error" role="alert">
                                {errors.email.message}
                            </p>
                        )}
                    </label>
                    <label className="mt-2" htmlFor="password">
                        Password
                        <input
                            className="block bg-bg-tertiary text-t-primary p-2 rounded-md"
                            type="password"
                            id="password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && (
                            <p className="text-error" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </label>
                    <label className="mt-2" htmlFor="repeatPassword">
                        Repeat Password
                        <input
                            className="block bg-bg-tertiary text-t-primary p-2 rounded-md"
                            type="password"
                            id="repeatPassword"
                            {...register('repeatPassword', {
                                required: true,
                                validate: (value) => {
                                    if (watch('password') !== value) {
                                        return 'Passwords must match'
                                    }
                                }
                            })}
                        />
                        {errors.repeatPassword && (
                            <p className="text-error" role="alert">
                                {errors.repeatPassword.message}
                            </p>
                        )}
                    </label>
                </fieldset>
                <button
                    className="bg-bg-extra p-1 px-5 rounded-md mt-5 w-max mx-auto"
                    type="submit">
                    Login
                </button>
                {errors.root && <p role="alert">{errors.root.message}</p>}
            </form>
        </section>
    )
}

export default RegisterPage
