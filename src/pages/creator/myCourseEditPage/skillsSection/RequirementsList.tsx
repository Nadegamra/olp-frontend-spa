import { useParams } from 'react-router-dom'
import { useGetCourseRequirementListQuery } from '../../../../features/api/ApiSliceCourseRequirements'
import 'flowbite'

function RequirementsList() {
    const { id } = useParams()
    const { isSuccess: isSuccessRequirements, data: requirements } =
        useGetCourseRequirementListQuery(parseInt(id ?? '-1'))

    return (
        <>
            <div className="border p-5 rounded-lg mb-5 grid grid-cols-3 gap-2">
                {(isSuccessRequirements &&
                    requirements.length > 0 &&
                    requirements.map((skill) => (
                        <div key={skill.id} className="flex p-3 bg-clr-bg2 ">
                            {skill.skill.name}
                        </div>
                    ))) || <div>Nothing here</div>}
            </div>
        </>
    )
}

export default RequirementsList
