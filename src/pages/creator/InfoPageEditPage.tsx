import { useParams } from 'react-router-dom'
import { useGetInfoPageQuery } from '../../features/api/ApiSliceInfoPages'

function InfopagePage() {
    const { courseId, sectionId, id } = useParams()
    const { data } = useGetInfoPageQuery([
        parseInt(courseId ?? '-1'),
        parseInt(sectionId ?? '-1'),
        parseInt(id ?? '-1')
    ])
    if (data !== undefined)
        return (
            <section>
                <div>{data.name}</div>
                <div>{data.text}</div>
            </section>
        )
}

export default InfopagePage
