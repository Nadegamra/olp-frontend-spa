import { useParams } from 'react-router-dom'
import Sidebar, { SidebarSection } from '../../components/ui/layout/Sidebar'
import useAuth from '../../stores/AuthStore'

function SettingsPage() {
    const { user } = useAuth()
    const { section } = useParams()

    const sections: SidebarSection[] = [
        {
            name: 'Profile',
            route: '/settings/profile',
            icon: 'person',
            isActive: section === 'profile'
        }
    ]

    return (
        <section>
            <Sidebar sections={sections} />
            <div className="p-4 sm:ml-64">{section}</div>
        </section>
    )
}

export default SettingsPage
