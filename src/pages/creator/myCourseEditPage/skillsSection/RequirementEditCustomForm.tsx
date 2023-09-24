import { useState } from 'react'
import {
    CourseRequirement,
    CourseRequirementUpdateRequest
} from '../../../../dtos/CourseRequirement'
import { Modal } from 'flowbite-react'
import InputField from '../../../../components/forms/InputField'
import { useUpdateCourseRequirementMutation } from '../../../../features/api/ApiSliceCourseRequirements'

function RequirementEditCustomForm({ requirement }: { requirement: CourseRequirement }) {
    const [description, setDescription] = useState<string>(requirement.customDescription)
    const [updateRequirement] = useUpdateCourseRequirementMutation()
    const [openModal, setOpenModal] = useState<string | undefined>()
    const props = { openModal, setOpenModal }
    return (
        <>
            <span
                className="material-symbols-outlined pr-3 cursor-pointer"
                onClick={() => props.setOpenModal('default')}>
                edit
            </span>
            <Modal
                dismissible
                show={props.openModal === 'default'}
                onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header className="bg-clr-bg3 border rounded-t-xl">
                    <span className="text-white">Edit skill</span>
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
                                    updateRequirement(
                                        new CourseRequirementUpdateRequest(
                                            requirement.courseId,
                                            requirement.id,
                                            description
                                        )
                                    )
                            }}>
                            edit
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RequirementEditCustomForm
