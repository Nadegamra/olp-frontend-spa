import { Modal } from 'flowbite-react'
import Button from '../../../../components/forms/Button'
import { useState } from 'react'
import InputField from '../../../../components/forms/InputField'
import { useGetSkillsSuggestionsQuery } from '../../../../features/api/ApiSliceSkill'
import { useAddGainedSkillMutation } from '../../../../features/api/ApiSliceGainedSkills'
import { GainedSkillCreateRequest } from '../../../../dtos/GainedSkill'
import { useParams } from 'react-router-dom'

function GainedSkillsAddModal() {
    const { courseId } = useParams()
    const [search, setSearch] = useState<string>('')
    const {
        data: skills,
        isFetching: isFetchingSkills,
        isSuccess: isSuccessSkills
    } = useGetSkillsSuggestionsQuery(search)
    const [addGainedSkill] = useAddGainedSkillMutation()
    const [openModal, setOpenModal] = useState<string | undefined>()
    const props = { openModal, setOpenModal }
    return (
        <>
            <Button onClick={() => props.setOpenModal('default')}>Search skills</Button>
            <Modal
                dismissible
                show={props.openModal === 'default'}
                onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header className="bg-clr-bg3 border rounded-t-xl">
                    <span className="text-white">Add Skills gained during the course</span>
                </Modal.Header>
                <Modal.Body className="bg-clr-bg3 text-white border rounded-b-xl">
                    <div className="p-10 w-full">
                        <InputField
                            text={''}
                            label={'Search'}
                            placeholder={'Search skills'}
                            value={search}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setSearch(e.target.value)
                            }
                        />
                        <div className="border border-clr-text3 rounded-md p-3 grid grid-cols-3 grid-rows-10 gap-3 auto-cols-max">
                            {!isFetchingSkills &&
                                isSuccessSkills &&
                                (skills?.length > 0 ? (
                                    skills?.map((sugg) => (
                                        <div className="flex p-3 bg-clr-bg2" key={sugg.id}>
                                            <span>{sugg.name}</span>
                                            <span className="flex-1" />
                                            <span
                                                className="material-symbols-outlined cursor-pointer"
                                                onClick={() => {
                                                    addGainedSkill(
                                                        new GainedSkillCreateRequest(
                                                            parseInt(courseId ?? '-1'),
                                                            '',
                                                            sugg.id
                                                        )
                                                    )
                                                }}>
                                                add
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div>No results found</div>
                                ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default GainedSkillsAddModal
