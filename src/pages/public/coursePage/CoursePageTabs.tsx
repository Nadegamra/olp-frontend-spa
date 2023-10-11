import { Tabs } from 'flowbite-react'
import DescriptionTab from './coursePageTabs/DescriptionTab'
import PricingNCertificatesTab from './coursePageTabs/PricingNCertificatesTab'
import SchedulingTab from './coursePageTabs/SchedulingTab'
import SkillsTab from './coursePageTabs/SkillsTab'
import LanguagesTab from './coursePageTabs/LanguagesTab'
import { CourseResponse } from '../../../dtos/Course'

function CoursePageTabs({ course }: { course: CourseResponse }) {
    const tabs = [
        {
            active: true,
            title: 'Description'
        },
        {
            active: false,
            title: 'Pricing & certificates'
        },
        {
            active: false,
            title: 'Scheduling'
        },
        {
            active: false,
            title: 'Skills'
        },
        {
            active: false,
            title: 'Languages'
        }
    ]

    const CourseContent = ({ tab }: { tab: string }) => {
        switch (tab) {
            case 'Description':
                return <DescriptionTab course={course} />
            case 'Pricing & certificates':
                return <PricingNCertificatesTab course={course} />
            case 'Scheduling':
                return <SchedulingTab course={course} />
            case 'Skills':
                return <SkillsTab course={course} />
            case 'Languages':
                return <LanguagesTab course={course} />
        }
    }

    return (
        <Tabs.Group aria-label="Course info tabs" style="underline">
            {tabs.map((t) => (
                <Tabs.Item key={t.title} title={t.title} active={t.active}>
                    <CourseContent tab={t.title} />
                </Tabs.Item>
            ))}
        </Tabs.Group>
    )
}

export default CoursePageTabs
