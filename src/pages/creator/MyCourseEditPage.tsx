import { useParams } from 'react-router-dom'
import { useGetUserCourseQuery } from '../../features/api/ApiSliceCourses'
import Sidebar, { SidebarSection } from '../../components/layout/Sidebar'
import DescriptionSection from './myCourseEditPage/DescriptionSection'
import { CourseResponseOwner } from '../../dtos/Course'
import PricingSection from './myCourseEditPage/PricingSection'
import CertificatesSection from './myCourseEditPage/CertificatesSection'
import SchedulingSection from './myCourseEditPage/SchedulingSection'
import SkillsSection from './myCourseEditPage/SkillsSection'
import LanguageSection from './myCourseEditPage/LanguageSection'
import VisibilitySection from './myCourseEditPage/VisibilitySection'
import DeleteSection from './myCourseEditPage/DeleteSection'

function MyCourseEditPage() {
    const { id, section } = useParams()
    const { data, isFetching, isError, isSuccess } = useGetUserCourseQuery(parseInt(id ?? '0'))

    const sections: SidebarSection[] = [
        {
            name: 'Description',
            sectionName: 'description',
            icon: 'description'
        },
        {
            name: 'Pricing',
            sectionName: 'pricing',
            icon: 'euro'
        },
        {
            name: 'Certificates',
            sectionName: 'certificates',
            icon: 'workspace_premium'
        },
        {
            name: 'Scheduling',
            sectionName: 'scheduling',
            icon: 'schedule'
        },
        {
            name: 'Skills',
            sectionName: 'skills',
            icon: 'keyboard_double_arrow_up'
        },
        {
            name: 'Languages',
            sectionName: 'language',
            icon: 'language'
        },
        {
            name: 'Visibility',
            sectionName: 'visibility',
            icon: 'visibility'
        },
        {
            name: 'Course Deletion',
            sectionName: 'delete',
            icon: 'delete'
        }
    ]

    const SectionContent = ({ data }: { data: CourseResponseOwner }) => {
        switch (section) {
            case 'description':
                return <DescriptionSection data={data} />
            case 'pricing':
                return <PricingSection data={data} />
            case 'certificates':
                return <CertificatesSection data={data} />
            case 'scheduling':
                return <SchedulingSection data={data} /> // Next course instances (fixed schedules)
            case 'skills':
                return <SkillsSection data={data} />
            case 'language':
                return <LanguageSection data={data} />
            case 'visibility':
                return <VisibilitySection data={data} />
            case 'delete':
                return <DeleteSection />
        }
    }

    if (!isFetching) {
        if (isError) {
            return <section>Course not found</section>
        } else if (isSuccess) {
            return (
                <section className="flex">
                    <Sidebar
                        sections={sections}
                        currentSection={section}
                        pageUrl={`/myCourses/${id}`}
                    />
                    <div className="ml-[-200px] sm:ml-0 p-4 w-full sm:w-[min(800px,50%)]">
                        <SectionContent data={data} />
                    </div>
                </section>
            )
        }
    }
}

export default MyCourseEditPage
