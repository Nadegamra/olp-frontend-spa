import { useForm } from 'react-hook-form'
import useAuth from '../../stores/AuthStore'
import { RegisterDTO, UserRole } from '../../dtos/User'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../../components/forms/Button'
import Spinner from '../../components/forms/Spinner'
import FormField from '../../components/forms/InputField'
import CustomRadio from '../../components/forms/Radio'

interface IRegisterInfo {
    email: string
    password: string
    repeatPassword: string
    role: UserRole
}

function RegisterPage() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setError
    } = useForm<IRegisterInfo>()

    // const { register: registerUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    return (
        <section className="p-5 flex flex-col items-center">
            <form
                aria-label="Register Form"
                className="m-auto bg-clr-bg2 flex flex-col p-7 rounded-md mb-7"
                onSubmit={handleSubmit(async (data) => {
                    setMessage('')
                    setLoading(true)

                    // const res = await registerUser(
                    //     new RegisterDTO(data.email, data.password, data.role)
                    // )
                    // setLoading(false)
                    // if (res === true) {
                    //     setMessage('Please check your email to confirm your account')
                    // } else if (res === false) {
                    //     setError('root', {
                    //         type: 'validate',
                    //         message: 'An error has occurred while registering'
                    //     })
                    // } else {
                    //     setError('root', {
                    //         type: 'validate',
                    //         message: res
                    //     })
                    // }
                })}
                aria-busy={loading}>
                <h1 className="text-center pb-3 text-fs-h1">Register</h1>
                <fieldset className="flex flex-col mb-2">
                    <legend className="sr-only">Registration details</legend>
                    <FormField
                        placeholder="email@example.com"
                        label="email"
                        text="Email"
                        type="email"
                        disabled={loading}
                        {...register('email', { required: true })}
                    />
                    <p className="text-clr-error h-5 mb-2" role="alert">
                        {errors.email?.type == 'required' && 'Email is required'}
                    </p>
                    <div className="flex flex-col sm:flex-row pb-5 sm:pb-3 gap-2">
                        <div className="flex flex-col">
                            <FormField
                                placeholder="password"
                                label="password"
                                text="Password"
                                type="password"
                                disabled={loading}
                                {...register('password', { required: true })}
                            />
                            <p className="text-clr-error h-5" role="alert">
                                {errors.password?.type == 'required' && 'Password is required'}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <FormField
                                placeholder="password"
                                label="repeatPassword"
                                text="Repeat Password"
                                type="password"
                                disabled={loading}
                                {...register('repeatPassword', {
                                    required: true,
                                    validate: (value) => value === watch('password')
                                })}
                            />
                            <p className="text-clr-error h-5" role="alert">
                                {errors.repeatPassword?.type == 'validate'
                                    ? 'Passwords must match'
                                    : errors.repeatPassword?.type == 'required' &&
                                      'Password is required'}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <CustomRadio
                            label="Creator"
                            id="role1"
                            helperText="Can create new courses"
                            value={UserRole.Creator}
                            {...register('role', { required: true })}
                        />
                        <CustomRadio
                            label="Learner"
                            id="role2"
                            helperText="Can take courses"
                            value={UserRole.Consumer}
                            {...register('role', { required: true })}
                        />
                    </div>
                    <p className="text-clr-error h-5" role="alert">
                        {errors.role?.type == 'required' && 'Role is required'}
                    </p>
                </fieldset>
                <div className="mx-auto mt-3">
                    <Button type="submit" disabled={loading}>
                        Register
                    </Button>
                </div>
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

export default RegisterPage
