import { useState } from 'react'
import { Language } from '../../../dtos/Language'
import { useDeleteLanguageMutation } from '../../../features/api/ApiSliceLanguages'

function LanguageRow({ language }: { language: Language }) {
    const [deleteSkill] = useDeleteLanguageMutation()
    const [name, setName] = useState<string>(language.name)
    return (
        <tr className="bg-clr-bg1 border-b border-clr-border" key={language.id}>
            <td className="px-6 py-3 text-clr-text1">{language.id}</td>

            <td className="px-6 py-3 text-clr-text1">
                <input
                    className="bg-clr-bg1 border text-clr-text1 border-clr-border rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-full p-2.5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </td>

            <td className="px-6 py-3 text-clr-text1">
                <span className="flex flex-row">
                    <span
                        onClick={() => {
                            deleteSkill(language.id)
                        }}
                        className="material-symbols-outlined pt-2 cursor-pointer text-fs-icon-lg">
                        delete
                    </span>
                </span>
            </td>
        </tr>
    )
}

export default LanguageRow
