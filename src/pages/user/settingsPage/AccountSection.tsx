import Button from '../../../components/forms/Button'
import { useState } from 'react'
import DeleteUserModal from '../../../components/modals/DeleteUserModal'

function AccountSection() {
    const [openModal, setOpenModal] = useState<boolean>(false)
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
                    setOpenModal(!openModal)
                }}>
                Delete Account
            </Button>
            <DeleteUserModal openModal={openModal} setOpenModal={setOpenModal} />
        </section>
    )
}

export default AccountSection
