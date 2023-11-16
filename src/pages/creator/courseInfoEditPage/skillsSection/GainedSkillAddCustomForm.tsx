import { Modal } from 'flowbite-react'
import { GainedSkillCreateRequest } from '../../../../dtos/GainedSkill'
import InputField from '../../../../components/forms/InputField'
import Button from '../../../../components/forms/Button'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAddGainedSkillMutation } from '../../../../features/api/ApiSliceGainedSkills'

function GainedSkillsAddCustomForm() {
    const { courseId } = useParams()
    const [description, setDescription] = useState<string>('')
    const [addGainedSkill] = useAddGainedSkillMutation()
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
                                    addGainedSkill(
                                        new GainedSkillCreateRequest(
                                            parseInt(courseId ?? '-1'),
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

export default GainedSkillsAddCustomForm
