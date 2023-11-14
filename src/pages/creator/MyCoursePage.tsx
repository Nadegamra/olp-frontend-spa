import { Tabs } from 'flowbite-react'
import CourseInfoEditPage from './courseInfoEditPage/CourseInfoEditPage'
import CourseSectionsEditPage from './courseSectionsEditPage/CourseSectionsEditPage'
import { useNavigate, useParams } from 'react-router-dom'

function MyCoursePage() {
    const { tab, courseId } = useParams()
    const navigate = useNavigate()
    const tabs = [
        {
            name: 'info',
            active: tab === 'info',
            title: 'Course Info',
            url: `/myCourses/${courseId}/info/description`
        },
        {
            name: 'sections',
            active: tab === 'sections',
            title: 'Sections',
            url: `/myCourses/${courseId}/sections`
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
        <Tabs.Group
            aria-label="Course edit page tabs"
            style="underline"
            onActiveTabChange={(tab) => {
                navigate(tabs[tab].url)
            }}>
            {tabs.map((t) => (
                <Tabs.Item key={t.title} title={t.title} active={t.active}>
                    <PageContent tab={t.title} />
                </Tabs.Item>
            ))}
        </Tabs.Group>
    )
}

export default MyCoursePage
