import { useParams } from 'react-router-dom'
import {
    useGetCourseSubtitleListQuery,
    useRemoveCourseSubtitleMutation
} from '../../../../features/api/ApiSliceCourseSubtitles'
import { CourseSubtitleDeleteRequest } from '../../../../dtos/CourseSubtitle'

function CourseGainedSkillsList() {
    const { id } = useParams()
    const { isSuccess: isSuccessLanguages, data: courseLanguages } = useGetCourseSubtitleListQuery(
        parseInt(id ?? '-1')
    )
    const [removeCourseLanguage] = useRemoveCourseSubtitleMutation()
    return (
        <>
            <div className="border p-5 rounded-lg mb-5 grid grid-cols-1 gap-2">
                {(isSuccessLanguages &&
                    courseLanguages.length > 0 &&
                    courseLanguages.map((courseLanguage) => (
                        <div key={courseLanguage.id} className="flex p-3 bg-clr-bg2 ">
                            <span>{courseLanguage.language.name}</span>
                            <span className="flex-1" />
                            <span
                                className="material-symbols-outlined cursor-pointer"
                                onClick={() =>
                                    removeCourseLanguage(
                                        new CourseSubtitleDeleteRequest(
                                            courseLanguage.courseId,
                                            courseLanguage.id
                                        )
                                    )
                                }>
                                delete
                            </span>
                        </div>
                    ))) || <div>Nothing here</div>}
            </div>
        </>
    )
}

export default CourseGainedSkillsList
