import { useParams } from 'react-router-dom'
import { useGetCourseQuery } from '../../features/api/ApiSliceCourses'
import CoursePageHeader from './coursePage/CoursePageHeader'

function CoursePage() {
    const { id } = useParams()
    const { data } = useGetCourseQuery(parseInt(id ?? '-1'))
    if (data !== undefined)
        return (
            <>
                <div className="flex flex-row">
                    <img
                        className="p-5 rounded-lg"
                        src={`https://localhost:44398/courses/${id}/image`}
                    />
                    <div className="p-5">
                        <CoursePageHeader course={data} />
                        <h2 className="text-fs-h2 pb-1 font-bold">Main info</h2>
                        <hr />
                        <div>Name: {data?.name}</div>
                        <div>Short description: {data?.shortDescription}</div>
                        <div>Detailed description: {data?.detailedDescription}</div>
                        <h2 className="text-fs-h2 pb-1 font-bold">Princing and certificates</h2>
                        <hr />
                        <div>Price: {data?.price}</div>
                        <div>Grants certificate: {data?.grantsCertificate ? 'true' : 'false'}</div>
                        {data?.grantsCertificate && (
                            <div>Certificate Price: {data?.certificatePrice}</div>
                        )}
                        <h2 className="text-fs-h2 pb-1 font-bold">Organisation rules</h2>
                        <hr />
                        <div>Length In Days: {data?.lengthInDays}</div>
                        <div>Activity Format: {data?.activityFormat}</div>
                        <div>Schedule Type: {data?.scheduleType}</div>
                        <h2 className="text-fs-h2 pb-1 font-bold">Skills</h2>
                        <hr />
                        <div>Difficulty: {data?.difficulty}</div>
                        <div>Gained Skills: {data?.gainedSkills.length}</div>
                        <div>Requirements: {data?.requirements.length}</div>
                        <h2 className="text-fs-h2 pb-1 font-bold">Languages</h2>
                        <hr />
                        <div>Languages: {data?.languages.length}</div>
                        <div>Subtitles: {data?.subtitles.length}</div>
                    </div>
                </div>
            </>
        )
}

export default CoursePage
