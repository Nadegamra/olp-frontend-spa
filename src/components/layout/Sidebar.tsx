import { Link } from 'react-router-dom'

export interface SidebarSection {
    name: string
    sectionName: string
    icon: string
}

interface Sections {
    sections: SidebarSection[]
    currentSection?: string
    pageUrl: string
}

function Sidebar({ sections, currentSection, pageUrl }: Sections) {
    return (
        <>
            <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-clr-text1 rounded-lg hover:bg-clr-bg3 sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                className="w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-clr-bg3">
                    <ul className="space-y-2 font-medium">
                        {sections.map(({ icon, name, sectionName }) => (
                            <li key={sectionName}>
                                <Link
                                    to={`${pageUrl}/${sectionName}`}
                                    className={
                                        currentSection?.toUpperCase() === sectionName.toUpperCase()
                                            ? 'flex items-center p-2 text-clr-text1 rounded-lg bg-clr-bg2 hover:bg-clr-bg1 cursor-pointer'
                                            : 'flex items-center p-2 text-clr-text1 rounded-lg bg-clr-bg3 hover:bg-clr-bg1 cursor-pointer'
                                    }>
                                    {currentSection?.toUpperCase() === sectionName.toUpperCase() ? (
                                        <>
                                            <span className="material-symbols-outlined text-clr-link select-none">
                                                {icon}
                                            </span>
                                            <span className="ml-3 text-clr-link select-none">
                                                {name}
                                            </span>
                                            <span className="material-symbols-outlined text-clr-link select-none ml-auto sm:hidden">
                                                {icon}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined select-none">
                                                {icon}
                                            </span>
                                            <span className="ml-3 select-none">{name}</span>
                                            <span className="material-symbols-outlined select-none ml-auto sm:hidden">
                                                {icon}
                                            </span>
                                        </>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
