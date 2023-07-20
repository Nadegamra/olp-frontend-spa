import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/forms/Spinner'
import { useChangeEmailMutation } from '../../features/api/ApiSliceUsers'

function ChangeEmailPage() {
    const { token } = useParams()
    const [changeEmail, { isLoading, isSuccess }] = useChangeEmailMutation()

    useEffect(() => {
        changeEmail(token ?? '')
    }, [])

    return (
        <section className="p-5 flex flex-col items-center">
            {isLoading && (
                <div className="mx-auto mt-16">
                    <Spinner />
                </div>
            )}
            {!isLoading && (
                <div className="m-auto bg-clr-bg2 flex flex-col p-7 mt-10 rounded-md">
                    {isSuccess
                        ? 'Email Address has been successfully updated'
                        : 'The token is invalid or expired'}
                </div>
            )}
        </section>
    )
}

export default ChangeEmailPage
