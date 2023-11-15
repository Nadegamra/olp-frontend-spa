import { Modal } from 'flowbite-react'
import Button from '../forms/Button'
import { useDeleteUserMutation } from '../../features/api/ApiSliceUsers'
import { useAppDispatch } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { sessionEnded } from '../../features/auth/AuthSlice'

interface Props {
    openModal: boolean
    setOpenModal: (value: React.SetStateAction<boolean>) => void
}

function DeleteUserModal({ openModal, setOpenModal }: Props) {
    const [deleteUser] = useDeleteUserMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="bg-clr-bg1">
                    <span className="text-clr-text1">User Deletion</span>
                </Modal.Header>
                <Modal.Body className="bg-clr-bg1 text-clr-text1">
                    Do you really wish to delete your account? You will be able to recover your
                    account by logging in within the next 30 days.
                </Modal.Body>
                <Modal.Footer className="bg-clr-bg1">
                    <Button color="primary" type="button" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        type="button"
                        onClick={() => {
                            deleteUser(undefined).unwrap()
                            dispatch(sessionEnded(undefined))
                            navigate('/')
                        }}>
                        Delete account
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteUserModal
