import { useState } from 'react'
import { useCreateLanguageMutation } from '../../../features/api/ApiSliceLanguages'
import { AddLanguageRequest } from '../../../dtos/Language'

function AddLanguageRow() {
    const [name, setName] = useState<string>('')
    const [addLanguage] = useCreateLanguageMutation()
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
                <span
                    onClick={() => {
                        addLanguage(new AddLanguageRequest(name ?? ''))
                            .unwrap()
                            .finally(() => {
                                setName('')
                            })
                    }}
                    className="material-symbols-outlined m-auto pt-2 text-fs-icon-lg cursor-pointer">
                    add
                </span>
            </td>
        </tr>
    )
}

export default AddLanguageRow
