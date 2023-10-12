import { useParams } from 'react-router-dom'
import { useGetSectionListQuery } from '../../../features/api/ApiSliceSections'
import CourseSectionListItem from './CourseSectionListItem'
import { useCallback, useState } from 'react'
import { produce } from 'immer'
import Button from '../../../components/forms/Button'

function CourseSectionList() {
    const { id } = useParams()
    const { data } = useGetSectionListQuery(parseInt(id ?? '-1'))
    const [expanded, setExpanded] = useState<boolean[]>([])

    const toggleSection = useCallback((id: number) => {
        const idx = data?.findIndex((x) => x.id == id)
        if (idx !== undefined) {
            setExpanded(
                produce((draft) => {
                    draft[idx] = !draft[idx]
                })
            )
        }
    }, [])

    const toggleAll = useCallback((value: boolean) => {
        setExpanded(
            produce((draft) => {
                for (let i = 0; i < expanded.length; i++) {
                    draft[i] = value
                }
            })
        )
    }, [])

    if (data !== undefined) {
        if (expanded.length == 0 && data.length > 0) {
            setExpanded(new Array(data.length).fill(false))
        }

        return (
            <section>
                <section className="flex flex-row p-5">
                    <Button onClick={() => toggleAll(true)}>Expand All</Button>
                    <Button onClick={() => toggleAll(false)}>Shrink All</Button>
                </section>
                <section>
                    {data.map((item) => (
                        <CourseSectionListItem
                            section={item}
                            expanded={expanded[data.findIndex((x) => x.id === item.id)]}
                            toggleSection={toggleSection}
                        />
                    ))}
                </section>
            </section>
        )
    }
}

export default CourseSectionList
