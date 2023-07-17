import { useForm } from 'react-hook-form'
// import useAuth from '../../stores/AuthStore'
import { LoginRequestDTO } from '../../dtos/User'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../../components/forms/Button'
import Spinner from '../../components/forms/Spinner'
import FormField from '../../components/forms/InputField'
import { useLoginMutation } from '../../features/api/ApiSlice'

interface ILoginInfo {
    email: string
    password: string
}

function LoginPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError
    } = useForm<ILoginInfo>()
    const [reduxLogin, { isLoading, isError, isSuccess }] = useLoginMutation()
    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
        if (isError) {
            setError('root', {
                type: 'validate',
                message: 'An error has occurred'
            })
        }
    }, [isSuccess, isError])

    return (
        <section className="p-5 flex flex-col items-center">
            <form
                aria-label="Login Form"
                className="m-auto bg-clr-bg2 flex flex-col p-7 rounded-md mb-7"
                onSubmit={handleSubmit(async (data) => {
                    setLoading(true)
                    await reduxLogin(new LoginRequestDTO(data.email, data.password, false))
                })}>
                <h1 className="text-center pb-3 text-fs-h1">Login</h1>
                <fieldset className="flex flex-col">
                    <legend className="sr-only">Login details</legend>
                    <FormField
                        placeholder="email@example.com"
                        label="email"
                        text="Email"
                        type="email"
                        disabled={loading}
                        {...register('email', { required: true })}
                    />
                    <p className="text-error h-5" role="alert">
                        {errors.email?.type == 'required' && 'Email is required'}
                    </p>
                    <FormField
                        placeholder="password"
                        label="password"
                        text="Password"
                        type="password"
                        disabled={loading}
                        {...register('password', { required: true })}
                    />
                    <p className="text-error h-3" role="alert">
                        {errors.password?.type == 'required' && 'Password is required'}
                    </p>
                </fieldset>
                <Link to={'/forgotPassword'} className="text-center text-clr-text2" type="button">
                    Forgot password?
                </Link>
                <div className="mx-auto mt-7">
                    <Button type="submit" disabled={loading}>
                        Login
                    </Button>
                </div>
            </form>
            {errors.root && (
                <p className="text-clr-error" role="alert">
                    {errors.root.message}
                </p>
            )}
            {isLoading && (
                <div className="mx-auto">
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default LoginPage
