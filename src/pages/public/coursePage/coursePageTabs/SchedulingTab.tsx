import { CourseResponse } from '../../../../dtos/Course'

function SchedulingTab({ course }: { course: CourseResponse }) {
    return (
        <section>
            <div>Length In Days: {course.lengthInDays}</div>
            <div>Activity Format: {course.activityFormat}</div>
            <div>Schedule Type: {course.scheduleType}</div>
        </section>
    )
}

export default SchedulingTab
