import { useParams } from 'react-router-dom'
import { useGetInfoPageQuery } from '../../features/api/ApiSliceInfoPages'
import parse from 'html-react-parser'
import './InfoPageViewPage.css'

function InfoPageViewPage() {
    const { courseId, sectionId, id } = useParams()
    const { data } = useGetInfoPageQuery([
        parseInt(courseId ?? '-1'),
        parseInt(sectionId ?? '-1'),
        parseInt(id ?? '-1')
    ])

    if (data !== undefined)
        return (
            <section>
                <h1 className="p-5 text-fs-h1">{data.name}</h1>
                <div className="p-5" id="infoText">
                    {parse(data.text)}
                </div>
                <div className="mt-5" />
            </section>
        )
}

export default InfoPageViewPage
