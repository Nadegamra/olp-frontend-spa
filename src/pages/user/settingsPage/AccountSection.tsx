import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import Button from '../../../components/forms/Button'
import { useDeleteUserMutation } from '../../../features/api/ApiSliceUsers'
import { sessionEnded } from '../../../features/auth/AuthSlice'

function AccountSection() {
    const [deleteUser] = useDeleteUserMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <section>
            <header className="mb-5">
                <h1 className="text-fs-h1 text-clr-error">Delete Account</h1>
                <hr className="border-clr-error" />
            </header>
            <label className="font-semibold pb-3 text-clr-error">
                <p className="pb-2">This will queue the account for deletion.</p>
                <p className="pb-2">The account can be recovered by logging in within 30 days.</p>
            </label>
            <Button
                color="error"
                type="button"
                onClick={() => {
                    deleteUser(undefined).unwrap()
                    dispatch(sessionEnded(undefined))
                    navigate('/')
                }}>
                Delete Account
            </Button>
        </section>
    )
}

export default AccountSection
