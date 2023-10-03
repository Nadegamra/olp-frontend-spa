import { useState } from 'react'
import { SkillResponse, SkillUpdateRequest } from '../../../dtos/Skill'
import { useDeleteSkillMutation, useUpdateSkillMutation } from '../../../features/api/ApiSliceSkill'

function SkillRow({ skill }: { skill: SkillResponse }) {
    const [deleteSkill] = useDeleteSkillMutation()
    const [updateSkill] = useUpdateSkillMutation()
    const [name, setName] = useState<string>(skill.name)
    const [description, setDescription] = useState<string>(skill.description)
    return (
        <tr className="bg-clr-bg1 border-b border-clr-border" key={skill.id}>
            <td className="px-6 py-3 text-clr-text1">{skill.id}</td>

            <td className="px-6 py-3 text-clr-text1">
                <input
                    className="bg-clr-bg1 border text-clr-text1 border-clr-border rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-full p-2.5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </td>

            <td className="px-6 py-3 text-clr-text1">
                <textarea
                    className="bg-clr-bg1 border text-clr-text1 border-clr-border rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:max-w-full sm:w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </td>
            <td className="px-6 py-3 text-clr-text1">
                <span className="flex flex-row">
                    <span
                        onClick={() => {
                            updateSkill(new SkillUpdateRequest(skill.id, name, description))
                        }}
                        className="pr-5 material-symbols-outlined pt-2 cursor-pointer text-fs-icon-lg">
                        edit
                    </span>
                    <span
                        onClick={() => {
                            deleteSkill(skill.id)
                        }}
                        className="material-symbols-outlined pt-2 cursor-pointer text-fs-icon-lg">
                        delete
                    </span>
                </span>
            </td>
        </tr>
    )
}

export default SkillRow
