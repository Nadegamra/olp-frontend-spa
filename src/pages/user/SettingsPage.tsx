import { useParams } from 'react-router-dom'
import Sidebar, { SidebarSection } from '../../components/layout/Sidebar'
import useAuth from '../../stores/AuthStore'
import PublicProfileSection from './settingsPage/PublicProfileSection'
import PasswordSection from './settingsPage/PasswordSection'
import EmailSection from './settingsPage/EmailSection'
import AppearanceSection from './settingsPage/AppearanceSection'

function SettingsPage() {
    const { user } = useAuth()
    const { section } = useParams()

    const sections: SidebarSection[] = [
        {
            name: 'Public profile',
            sectionName: 'public',
            icon: 'public'
        },
        {
            name: 'Password',
            sectionName: 'password',
            icon: 'key'
        },
        {
            name: 'Email',
            sectionName: 'email',
            icon: 'email'
        },
        {
            name: 'Appearance',
            sectionName: 'appearance',
            icon: 'brush'
        }
    ]

    const SectionContent = () => {
        switch (section) {
            case 'public':
                return <PublicProfileSection />
            case 'password':
                return <PasswordSection />
            case 'email':
                return <EmailSection />
            case 'appearance':
                return <AppearanceSection />
        }
    }

    return (
        <section className="flex">
            <Sidebar sections={sections} currentSection={section} />
            <SectionContent />
        </section>
    )
}

export default SettingsPage
