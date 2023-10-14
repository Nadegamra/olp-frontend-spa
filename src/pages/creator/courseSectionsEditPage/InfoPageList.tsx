import { Link, useParams } from 'react-router-dom'
import {
    useDeleteInfoPageMutation,
    useGetInfoPageListQuery,
    useUpdateInfoPageMutation
} from '../../../features/api/ApiSliceInfoPages'
import { toast } from 'react-toastify'
import { InfoPageUpdateRequest } from '../../../dtos/InfoPage'

function InfoPageList({ sectionId, editMode }: { sectionId: number; editMode: boolean }) {
    const { courseId } = useParams()
    const { data } = useGetInfoPageListQuery([parseInt(courseId ?? '-1'), sectionId])
    const [deleteInfoPage] = useDeleteInfoPageMutation()
    const [updateInfoPage] = useUpdateInfoPageMutation()

    if (data !== undefined)
        return (
            <section className="px-5">
                {data.map((x) => (
                    <div className="flex flex-row p-3 border rounded-2xl my-3 items-center cursor-pointer">
                        <div className="flex flex-row w-full">
                            <Link
                                to={
                                    editMode
                                        ? `/myCourses/${courseId}/sections/${sectionId}/infoPages/${x.id}/edit`
                                        : `/myCourses/${courseId}/sections/${sectionId}/infoPages/${x.id}`
                                }
                                className="flex-1 flex flex-row">
                                <div className="material-symbols-outlined text-[35px] pr-3">
                                    description
                                </div>
                                <div>{x.name}</div>
                            </Link>
                            {editMode && (
                                <div
                                    onClick={() =>
                                        updateInfoPage([
                                            parseInt(courseId ?? '-1'),
                                            sectionId,
                                            x.id,
                                            new InfoPageUpdateRequest(x.name, x.text, !x.isHidden)
                                        ])
                                            .unwrap()
                                            .then(() =>
                                                toast.success('Changed visibility successfully')
                                            )
                                            .catch(() => toast.error('An error has occured'))
                                    }
                                    className="material-symbols-outlined text-[35px] pr-3">
                                    {x.isHidden ? 'visibility' : 'visibility_off'}
                                </div>
                            )}
                            {editMode && (
                                <div
                                    onClick={() =>
                                        deleteInfoPage([
                                            parseInt(courseId ?? '-1'),
                                            sectionId,
                                            x.id
                                        ])
                                            .unwrap()
                                            .then(() =>
                                                toast.success('Info page deleted successfully')
                                            )
                                            .catch(() => toast.error('An error has occured'))
                                    }
                                    className="material-symbols-outlined text-[35px] pr-3">
                                    delete
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>
        )
}

export default InfoPageList
