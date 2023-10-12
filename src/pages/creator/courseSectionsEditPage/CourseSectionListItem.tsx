import React, { useState } from 'react'
import { Section } from '../../../dtos/Section'

function CourseSectionListItem({
    section,
    expanded,
    toggleSection
}: {
    section: Section
    expanded: boolean
    toggleSection: (id: number) => void
}) {
    return (
        <React.Fragment key={section.id}>
            <h2 className="w-full flex">
                <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between p-5 font-medium text-left text-clr-text3 flex-1 mx-4 border-b border-clr-border focus:ring-1 focus:ring-clr-bg-extra hover:bg-clr-bg2">
                    <span className="flex items-center">{section.name}</span>
                    <span className="material-symbols-outlined">
                        {' '}
                        {expanded ? 'expand_less' : 'expand_more'}
                    </span>
                </button>
            </h2>
            {expanded && (
                <div>
                    <div className="p-5">{section.description}</div>
                </div>
            )}
        </React.Fragment>
    )
}

export default CourseSectionListItem
