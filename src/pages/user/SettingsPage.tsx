import { useParams } from 'react-router-dom'
import Sidebar, { SidebarSection } from '../../components/layout/Sidebar'
import PublicProfileSection from './settingsPage/PublicProfileSection'
import PasswordSection from './settingsPage/PasswordSection'
import EmailSection from './settingsPage/EmailSection'
import AppearanceSection from './settingsPage/AppearanceSection'
import AccountSection from './settingsPage/AccountSection'
import EducatorSection from './settingsPage/EducatorSection'
import { useAppSelector } from '../../app/hooks'

function SettingsPage() {
    const { section } = useParams()
    const { role } = useAppSelector((state) => state.auth)
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
        },
        {
            name: 'Account',
            sectionName: 'account',
            icon: 'person'
        }
    ]
    if (role === 'CREATOR') {
        sections.push({
            name: 'Educator Profile',
            sectionName: 'educatorProfile',
            icon: 'school'
        })
    }

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
            case 'account':
                return <AccountSection />
            case 'educatorProfile':
                return <EducatorSection />
        }
    }

    return (
        <section className="flex">
            <Sidebar sections={sections} currentSection={section} pageUrl="/settings" />
            <div className="ml-[-200px] sm:ml-0 p-4 w-full sm:w-[min(800px,50%)]">
                <SectionContent />
            </div>
        </section>
    )
}

export default SettingsPage
