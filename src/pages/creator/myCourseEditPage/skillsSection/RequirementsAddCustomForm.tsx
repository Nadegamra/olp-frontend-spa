import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAddCourseRequirementMutation } from '../../../../features/api/ApiSliceCourseRequirements'
import InputField from '../../../../components/forms/InputField'
import { CourseRequirementCreateRequest } from '../../../../dtos/CourseRequirement'
import Button from '../../../../components/forms/Button'
import { Modal } from 'flowbite-react'

function RequirementsAddCustomForm() {
    const { id } = useParams()
    const [description, setDescription] = useState<string>('')
    const [addRequirement] = useAddCourseRequirementMutation()
    const [openModal, setOpenModal] = useState<string | undefined>()
    const props = { openModal, setOpenModal }
    return (
        <>
            <Button onClick={() => props.setOpenModal('default')}>Not finding a skill?</Button>
            <Modal
                dismissible
                show={props.openModal === 'default'}
                onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header className="bg-clr-bg3 border rounded-t-xl">
                    <span className="text-white">Add Custom Skills</span>
                </Modal.Header>
                <Modal.Body className="bg-clr-bg3 text-white border rounded-b-xl">
                    <div className="p-10 w-full flex flex-row">
                        <InputField
                            text={''}
                            label={'customDescription'}
                            placeholder={'Add description'}
                            value={description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setDescription(e.target.value)
                            }
                        />
                        <span
                            className="inline material-symbols-outlined cursor-pointer p-2"
                            tabIndex={0}
                            onClick={() => {
                                if (description !== '')
                                    addRequirement(
                                        new CourseRequirementCreateRequest(
                                            parseInt(id ?? '-1'),
                                            description
                                        )
                                    )
                            }}>
                            add
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RequirementsAddCustomForm
