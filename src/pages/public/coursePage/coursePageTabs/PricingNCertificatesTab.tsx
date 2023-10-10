import { CourseResponse } from '../../../../dtos/Course'

function PricingNCertificatesTab({ course }: { course: CourseResponse }) {
    return (
        <section>
            <div>Price: {course.price}</div>
            <div>Grants certificate: {course.grantsCertificate ? 'true' : 'false'}</div>
            {course.grantsCertificate && <div>Certificate Price: {course.certificatePrice}</div>}
        </section>
    )
}

export default PricingNCertificatesTab
