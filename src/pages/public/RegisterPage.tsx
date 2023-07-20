import { useForm } from 'react-hook-form'
import { RegisterDTO, UserRole } from '../../dtos/User'
import Button from '../../components/forms/Button'
import Spinner from '../../components/forms/Spinner'
import FormField from '../../components/forms/InputField'
import CustomRadio from '../../components/forms/Radio'
import { useRegisterMutation } from '../../features/api/ApiSliceAuth'
import { toast } from 'react-toastify'

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
        watch
    } = useForm<IRegisterInfo>()
    const [registerRequest, { isLoading }] = useRegisterMutation()
    return (
        <section className="p-5 flex flex-col items-center">
            <form
                aria-label="Register Form"
                className="m-auto bg-clr-bg2 flex flex-col p-7 rounded-md mb-7"
                onSubmit={handleSubmit(async (data) => {
                    registerRequest(new RegisterDTO(data.email, data.password, data.role))
                        .unwrap()
                        .then(() => toast.success('Please chech your email for confirmation mail'))
                        .catch((error: any) => {
                            const errObj: object = error.response.data.errors
                            Object.values(errObj).forEach((value) => toast.error(value))
                        })
                })}
                aria-busy={isLoading}>
                <h1 className="text-center pb-3 text-fs-h1">Register</h1>
                <fieldset className="flex flex-col mb-2">
                    <legend className="sr-only">Registration details</legend>
                    <FormField
                        placeholder="email@example.com"
                        label="email"
                        text="Email"
                        type="email"
                        disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                    <Button type="submit" disabled={isLoading}>
                        Register
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

export default RegisterPage
