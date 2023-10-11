import { useGetSkillListQuery, useGetSkillsCountQuery } from '../../features/api/ApiSliceSkill'
import SkillRow from './skillsListPage/SkillRow'
import Pagination from '../../components/layout/Pagination'
import AddSkillRow from './skillsListPage/AddSkillRow'
import SkillsHeaderRow from './skillsListPage/SkillsHeaderRow'
import { useState } from 'react'

function SkillsListPage() {
    const [from, setFrom] = useState<number>(0)
    const perPage = 10
    const to = from + perPage
    const { data, isFetching, isSuccess } = useGetSkillListQuery({ skip: from, take: perPage })
    const { data: count } = useGetSkillsCountQuery(undefined)
    if (!isFetching && isSuccess) {
        return (
            <section className="min-h-[80vh] flex flex-col pb-5">
                <div className="mx-auto mt-10 flex-1 pb-5">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-clr-text2 uppercase bg-clr-bg2">
                            <SkillsHeaderRow />
                        </thead>
                        <tbody>
                            <AddSkillRow />
                            {data.map((skill) => (
                                <SkillRow skill={skill} key={skill.id} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    from={from}
                    to={to}
                    of={count?.count ?? -1}
                    units="Skills"
                    setFrom={setFrom}
                />
            </section>
        )
    }
}

export default SkillsListPage
