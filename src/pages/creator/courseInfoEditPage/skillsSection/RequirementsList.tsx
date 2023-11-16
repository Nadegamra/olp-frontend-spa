import { useParams } from 'react-router-dom'
import {
    useGetCourseRequirementListQuery,
    useRemoveCourseRequirementMutation
} from '../../../../features/api/ApiSliceCourseRequirements'
import 'flowbite'
import { CourseRequirementDeleteRequest } from '../../../../dtos/CourseRequirement'
import RequirementEditCustomForm from './RequirementEditCustomForm'

function RequirementsList() {
    const { courseId } = useParams()
    const { isSuccess: isSuccessRequirements, data: requirements } =
        useGetCourseRequirementListQuery(parseInt(courseId ?? '-1'))
    const [removeRequirement] = useRemoveCourseRequirementMutation()
    return (
        <>
            <div className="border p-5 rounded-lg mb-5 grid grid-cols-1 gap-2">
                {(isSuccessRequirements &&
                    requirements.length > 0 &&
                    requirements.map((requirement) => (
                        <div key={requirement.id} className="flex p-3 bg-clr-bg2 ">
                            <span>
                                {requirement.skill !== null
                                    ? requirement.skill.name
                                    : requirement.customDescription}
                            </span>
                            <span className="flex-1" />
                            {requirement.customDescription !== '' && (
                                <RequirementEditCustomForm requirement={requirement} />
                            )}
                            <span
                                className="material-symbols-outlined cursor-pointer"
                                onClick={() =>
                                    removeRequirement(
                                        new CourseRequirementDeleteRequest(
                                            requirement.courseId,
                                            requirement.id
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

export default RequirementsList
