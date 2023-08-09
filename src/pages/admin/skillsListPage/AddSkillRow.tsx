import { useState } from 'react'
import Button from '../../../components/forms/Button'
import { useCreateSkillMutation } from '../../../features/api/ApiSliceSkill'
import { SkillCreateRequest } from '../../../dtos/Skill'

function AddSkillRow() {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [createSkill] = useCreateSkillMutation()
    return (
        <tr className="bg-clr-bg1 border-b border-clr-border">
            <td className="px-6 py-3 text-clr-text1"> </td>
            <td className="px-6 py-3 text-clr-text1">
                <input
                    className="bg-clr-bg1 border text-clr-text1 border-clr-border rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-full p-2.5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </td>
            <td className="px-6 py-3 text-clr-text1">
                <textarea
                    className="bg-clr-bg1 border text-clr-text1 border-clr-border rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:max-w-full sm:w-full p-2.5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </td>
            <td className="px-6 py-3 text-clr-text1">
                <Button
                    onClick={() => {
                        createSkill(new SkillCreateRequest(name ?? '', description ?? ''))
                            .unwrap()
                            .finally(() => {
                                setName('')
                                setDescription('')
                            })
                    }}>
                    <span className="material-symbols-outlined m-auto pt-2">add</span>
                </Button>
            </td>
        </tr>
    )
}

export default AddSkillRow
