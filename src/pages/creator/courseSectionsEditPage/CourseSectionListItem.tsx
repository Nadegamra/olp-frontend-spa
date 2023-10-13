import React from 'react'
import { Section, SectionUpdateRequest } from '../../../dtos/Section'
import InfoPageList from './InfoPageList'
import {
    useDeleteSectionMutation,
    useUpdateSectionMutation
} from '../../../features/api/ApiSliceSections'
import { toast } from 'react-toastify'

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
    const [updateSection] = useUpdateSectionMutation()
    const [deleteSection] = useDeleteSectionMutation()
    return (
        <React.Fragment key={section.id}>
            <h2 className="w-full flex">
                <button className="flex justify-between p-5 font-medium text-left text-clr-text3 flex-1 mx-4 border-b border-clr-border focus:ring-1 focus:ring-clr-bg-extra hover:bg-clr-bg2">
                    <span
                        onClick={() => toggleSection(section.id)}
                        className="flex items-center flex-1">
                        {section.name}
                    </span>
                    {editMode && (
                        <>
                            <span
                                className="material-symbols-outlined pr-2"
                                onClick={() =>
                                    updateSection([
                                        section.courseId,
                                        section.id,
                                        new SectionUpdateRequest(
                                            section.name,
                                            section.description,
                                            !section.isHidden
                                        )
                                    ])
                                        .unwrap()
                                        .then(() =>
                                            toast.success('Changed visibility successfully')
                                        )
                                        .catch(() => toast.error('An error has occured'))
                                }>
                                {section.isHidden ? 'visibility' : 'visibility_off'}
                            </span>
                            <span
                                onClick={() =>
                                    deleteSection([section.courseId, section.id])
                                        .unwrap()
                                        .then(() => toast.success('Section deleted successfully'))
                                        .catch(() => toast.error('An error has occured'))
                                }
                                className="material-symbols-outlined">
                                delete
                            </span>
                        </>
                    )}
                    <span
                        onClick={() => toggleSection(section.id)}
                        className="material-symbols-outlined pl-5">
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
