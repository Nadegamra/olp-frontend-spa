import { useForm } from 'react-hook-form'
import Button from '../../../components/forms/Button'
import FormField from '../../../components/forms/FormField'
import useAuth from '../../../stores/AuthStore'
import { useEffect } from 'react'

interface Props {
    username: string
}

function PublicProfileSection() {
    const { user } = useAuth()
    const { handleSubmit, register, reset } = useForm<Props>()

    useEffect(() => {
        const defaultValues: Props = {
            username: user?.username ?? ''
        }
        reset({ ...defaultValues })
    }, [])

    return (
        <section className="p-4 w-[min(800px,50%)]">
            <h1 className="text-fs-h1">Public Profile</h1>
            <hr className="border-clr-text2 mb-5" />
            <h2 className="text-fs-h2">Display Name</h2>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data)
                })}>
                <fieldset className="w-[min(500px,60%)]">
                    <FormField {...register('username', { required: true })} />
                </fieldset>
                <div className="pt-5">
                    <Button text="Update profile" key={'save1'} type="submit" />
                </div>
            </form>
        </section>
    )
}

export default PublicProfileSection
