import { CourseResponse } from '../../../../dtos/Course'

function PricingNCertificatesTab({ course }: { course: CourseResponse }) {
    return (
        <section>
            <div>Price: {course.price}</div>
            {course.grantsCertificate && (
                <>
                    <div>Certificate included</div>
                    <div>Certificate Price: {course.certificatePrice}</div>
                </>
            )}
        </section>
    )
}

export default PricingNCertificatesTab
