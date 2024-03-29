import { useForm } from 'react-hook-form'
import { LoginRequestDTO } from '../../dtos/User'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/forms/Button'
import Spinner from '../../components/forms/Spinner'
import FormField from '../../components/forms/InputField'
import apiSlice, { useLoginMutation } from '../../features/api/ApiSliceAuth'
import { useAppDispatch } from '../../app/hooks'
import { toast } from 'react-toastify'

interface ILoginInfo {
    email: string
    password: string
}

function LoginPage() {
    const navigate = useNavigate()
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<ILoginInfo>()
    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useAppDispatch()
    return (
        <section className="p-5 flex flex-col items-center">
            <form
                aria-label="Login Form"
                className="m-auto bg-clr-bg2 flex flex-col p-7 rounded-md mb-7"
                onSubmit={handleSubmit(async (data) => {
                    await login(new LoginRequestDTO(data.email, data.password, false))
                        .unwrap()
                        .then(() => {
                            dispatch(apiSlice.endpoints.profile.initiate(undefined))
                            toast.success('Logged in successfully')
                            navigate('/')
                        })
                        .catch(() => {
                            toast.error('An error has occured')
                        })
                })}>
                <h1 className="text-center pb-3 text-fs-h1">Login</h1>
                <fieldset className="flex flex-col">
                    <legend className="sr-only">Login details</legend>
                    <FormField
                        placeholder="email@example.com"
                        label="email"
                        text="Email"
                        type="email"
                        disabled={isLoading}
                        {...register('email', { required: true })}
                        error={errors.email?.type === 'required' && 'Email is required'}
                    />
                    <FormField
                        placeholder="password"
                        label="password"
                        text="Password"
                        type="password"
                        disabled={isLoading}
                        {...register('password', { required: true })}
                        error={errors.password?.type === 'required' && 'Password is required'}
                    />
                </fieldset>
                <Link to={'/forgotPassword'} className="text-center text-clr-text2" type="button">
                    Forgot password?
                </Link>
                <div className="mx-auto mt-7">
                    <Button type="submit" disabled={isLoading}>
                        Login
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

export default LoginPage
