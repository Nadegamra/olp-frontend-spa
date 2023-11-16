import { useParams } from 'react-router-dom'
import { useGetLanguagesSuggestionsQuery } from '../../../../features/api/ApiSliceLanguages'
import { useAddCourseSubtitleMutation } from '../../../../features/api/ApiSliceCourseSubtitles'
import { useState } from 'react'
import Button from '../../../../components/forms/Button'
import { Modal } from 'flowbite-react'
import InputField from '../../../../components/forms/InputField'
import { CourseSubtitleCreateRequest } from '../../../../dtos/CourseSubtitle'

function SubtitlesAddModal() {
    const { courseId } = useParams()
    const [search, setSearch] = useState<string>('')
    const {
        data: skills,
        isFetching: isFetchingLanguages,
        isSuccess: isSuccessLanguages
    } = useGetLanguagesSuggestionsQuery(search)
    const [addSubtitle] = useAddCourseSubtitleMutation()
    const [openModal, setOpenModal] = useState<string | undefined>()
    const props = { openModal, setOpenModal }
    return (
        <>
            <Button onClick={() => props.setOpenModal('default')}>Search Languages</Button>
            <Modal
                dismissible
                show={props.openModal === 'default'}
                onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header className="bg-clr-bg3 border rounded-t-xl">
                    <span className="text-white">Add course subtitle languages</span>
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
                            {!isFetchingLanguages &&
                                isSuccessLanguages &&
                                (skills?.length > 0 ? (
                                    skills?.map((sugg) => (
                                        <div className="flex p-3 bg-clr-bg2" key={sugg.id}>
                                            <span>{sugg.name}</span>
                                            <span className="flex-1" />
                                            <span
                                                className="material-symbols-outlined cursor-pointer"
                                                onClick={() => {
                                                    addSubtitle(
                                                        new CourseSubtitleCreateRequest(
                                                            parseInt(courseId ?? '-1'),
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

export default SubtitlesAddModal
