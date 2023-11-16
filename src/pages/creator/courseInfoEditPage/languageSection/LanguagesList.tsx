import { useParams } from 'react-router-dom'
import {
    useGetCourseLanguageListQuery,
    useRemoveCourseLanguageMutation
} from '../../../../features/api/ApiSliceCourseLanguages'
import { CourseLanguageDeleteRequest } from '../../../../dtos/CourseLanguage'

function CourseGainedSkillsList() {
    const { courseId } = useParams()
    const { isSuccess: isSuccessLanguages, data: courseLanguages } = useGetCourseLanguageListQuery(
        parseInt(courseId ?? '-1')
    )
    const [removeCourseLanguage] = useRemoveCourseLanguageMutation()

    return (
        <>
            <div className="border p-5 rounded-lg mb-5 grid grid-cols-1 gap-2">
                {(isSuccessLanguages &&
                    courseLanguages.length > 0 &&
                    courseLanguages.map((courseLanguage) => (
                        <div key={courseLanguage.id} className="flex p-3 bg-clr-bg2 ">
                            <span>{courseLanguage.language.name}</span>
                            <span className="flex-1" />
                            <span>{courseLanguage.isPrimary && 'Primary'}</span>
                            {!courseLanguage.isPrimary && (
                                <span
                                    className="material-symbols-outlined cursor-pointer pl-5"
                                    onClick={() =>
                                        removeCourseLanguage(
                                            new CourseLanguageDeleteRequest(
                                                courseLanguage.courseId,
                                                courseLanguage.id
                                            )
                                        )
                                    }>
                                    delete
                                </span>
                            )}
                        </div>
                    ))) || <div>Nothing here</div>}
            </div>
        </>
    )
}

export default CourseGainedSkillsList
