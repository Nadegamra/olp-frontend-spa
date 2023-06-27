import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUsers from '../../api/UsersApi'
import Spinner from '../../components/forms/Spinner'

function ChangeEmailPage() {
    const { token } = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [isSuccess, setIsSuccess] = useState<boolean | undefined>()
    const { changeEmail } = useUsers()
    useEffect(() => {
        if (loading) {
            changeEmail(token ?? '').then((res) => {
                setIsSuccess(res)
                setLoading(false)
            })
        }
    }, [])

    return (
        <section className="p-5 flex flex-col items-center">
            {loading && (
                <div className="mx-auto mt-16">
                    <Spinner />
                </div>
            )}
            {!loading && isSuccess !== undefined && (
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
