import useUsers from '../../../api/UsersApi'
import Button from '../../../components/forms/Button'

function AccountSection() {
    const { deleteUser } = useUsers()
    return (
        <section>
            <header className="mb-5">
                <h1 className="text-fs-h1 text-clr-error">Delete Account</h1>
                <hr className="border-clr-text1" />
            </header>
            <label htmlFor="accountDelButton" className="font-semibold pb-3">
                <p className="pb-2">This will queue the account for deletion.</p>
                <p className="pb-2">The account can be recovered by logging in within 30 days.</p>
                <Button
                    text="Delete Account"
                    id="accountDelButton"
                    color="error"
                    type="button"
                    onClick={() => deleteUser()}
                    //TODO: Add confirmation modal
                />
            </label>
        </section>
    )
}

export default AccountSection
