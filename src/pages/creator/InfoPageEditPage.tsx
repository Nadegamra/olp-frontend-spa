import { useParams } from 'react-router-dom'
import {
    useGetInfoPageQuery,
    useUpdateInfoPageMutation
} from '../../features/api/ApiSliceInfoPages'

import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useRef, useState } from 'react'
import Button from '../../components/forms/Button'
import { InfoPageUpdateRequest } from '../../dtos/InfoPage'
import { toast } from 'react-toastify'
import InputField from '../../components/forms/InputField'

function InfoPageEditPage() {
    const { courseId, sectionId, id } = useParams()
    const [name, setName] = useState<string>('')
    const [updateInfoPage] = useUpdateInfoPageMutation()
    const { data } = useGetInfoPageQuery([
        parseInt(courseId ?? '-1'),
        parseInt(sectionId ?? '-1'),
        parseInt(id ?? '-1')
    ])
    const editorRef = useRef<any>(null)
    const updateText = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent())
            updateInfoPage([
                parseInt(courseId ?? '-1'),
                parseInt(sectionId ?? '-1'),
                parseInt(id ?? '-1'),
                new InfoPageUpdateRequest(name, editorRef.current.getContent(), data!.isHidden)
            ])
                .unwrap()
                .then(() => {
                    toast.success('Text updated successfully')
                })
                .catch(() => {
                    toast.error('An error has occured')
                })
        }
    }

    useEffect(() => {
        if (data !== undefined) {
            setName(data.name)
        }
    }, [data])

    let config = {
        skin: 'naked',
        inline_styles: true,
        content_css: 'light',
        height: 500,
        menubar: false,
        plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
        ],
        toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }
    const theme = (localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark'
    if (theme === 'dark') {
        config = { ...config, skin: 'oxide-dark', content_css: 'dark' }
    } else {
        config = { ...config, skin: 'naked', content_css: 'light' }
    }

    if (data !== undefined)
        return (
            <section>
                <InputField
                    id="name"
                    label="name"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    type="text"
                />
                <Editor
                    apiKey={'k9ef7v4h3f7s2w03gelkdczekdlqf6ljq5gm7yfzpjtug37o'}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={config}
                    initialValue={data.text}
                />
                <div className="mt-5" />
                <Button onClick={updateText}>Save changes</Button>
            </section>
        )
}

export default InfoPageEditPage
