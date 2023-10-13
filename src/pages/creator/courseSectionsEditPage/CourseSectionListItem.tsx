import React from 'react'
import { Section } from '../../../dtos/Section'
import InfoPageList from './InfoPageList'

function CourseSectionListItem({
    section,
    expanded,
    toggleSection,
    editMode
}: {
    section: Section
    expanded: boolean
    toggleSection: (id: number) => void
    editMode: boolean
}) {
    return (
        <React.Fragment key={section.id}>
            <h2 className="w-full flex">
                <button
                    className="flex justify-between p-5 font-medium text-left text-clr-text3 flex-1 mx-4 border-b border-clr-border focus:ring-1 focus:ring-clr-bg-extra hover:bg-clr-bg2"
                    onClick={() => toggleSection(section.id)}>
                    <span className="flex items-center">{section.name}</span>
                    <span className="flex-1" />
                    {editMode && (
                        <>
                            <span className="material-symbols-outlined">
                                {section.isHidden ? 'visibility' : 'visibility_off'}
                            </span>
                            <span className="material-symbols-outlined pr-5">delete</span>
                        </>
                    )}
                    <span className="material-symbols-outlined">
                        {expanded ? 'expand_less' : 'expand_more'}
                    </span>
                </button>
            </h2>
            {expanded && (
                <div>
                    <div className="p-5">{section.description}</div>
                    <InfoPageList sectionId={section.id} editMode={editMode} />
                </div>
            )}
        </React.Fragment>
    )
}

export default CourseSectionListItem
