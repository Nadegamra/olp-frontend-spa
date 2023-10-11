import { Tabs } from 'flowbite-react'
import CourseInfoEditPage from './CourseInfoEditPage'
import CourseSectionsEditPage from './CourseSectionsEditPage'

function MyCoursePage() {
    const tabs = [
        {
            active: true,
            title: 'Course Info'
        },
        {
            active: false,
            title: 'Sections'
        }
    ]

    const PageContent = ({ tab }: { tab: string }) => {
        switch (tab) {
            case 'Course Info':
                return <CourseInfoEditPage />
            case 'Sections':
                return <CourseSectionsEditPage />
        }
    }

    return (
        <Tabs.Group aria-label="Course edit page tabs" style="underline">
            {tabs.map((t) => (
                <Tabs.Item key={t.title} title={t.title} active={t.active}>
                    <PageContent tab={t.title} />
                </Tabs.Item>
            ))}
        </Tabs.Group>
    )
}

export default MyCoursePage
