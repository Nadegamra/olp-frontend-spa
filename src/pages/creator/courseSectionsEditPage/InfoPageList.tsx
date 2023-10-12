import { Link, useParams } from 'react-router-dom'
import { useGetInfoPageListQuery } from '../../../features/api/ApiSliceInfoPages'

function InfoPageList({ sectionId }: { sectionId: number }) {
    const { id } = useParams()
    const { data } = useGetInfoPageListQuery([parseInt(id ?? '-1'), sectionId])
    if (data !== undefined)
        return (
            <section className="px-5">
                {data.map((x) => (
                    <Link
                        to={`/myCourses/${id}/sections/${sectionId}/infoPages/${x.id}`}
                        className="flex flex-row p-3 border rounded-2xl my-3 items-center cursor-pointer">
                        <span className="material-symbols-outlined text-[35px] pr-3">
                            description
                        </span>
                        <div>{x.name}</div>
                    </Link>
                ))}
            </section>
        )
}

export default InfoPageList
