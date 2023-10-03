import { useState } from 'react'
import {
    useGetLanguageCountQuery,
    useGetLanguageListQuery
} from '../../features/api/ApiSliceLanguages'
import Pagination from '../../components/layout/Pagination'
import LanguageHeaderRow from './languageListPage/LanguageHeaderRow'
import AddLanguageRow from './languageListPage/AddLanguageRow'
import LanguageRow from './languageListPage/LanguageRow'

function LanguageListPage() {
    const [from, setFrom] = useState<number>(0)
    const perPage = 10
    const to = from + perPage
    const { data, isFetching, isSuccess } = useGetLanguageListQuery({ skip: from, take: perPage })
    const { data: count } = useGetLanguageCountQuery(undefined)
    if (!isFetching && isSuccess) {
        return (
            <section className="min-h-[80vh] flex flex-col pb-5">
                <div className="mx-auto mt-10 flex-1 pb-5">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-clr-text2 uppercase bg-clr-bg2">
                            <LanguageHeaderRow />
                        </thead>
                        <tbody>
                            <AddLanguageRow />
                            {data.map((language) => (
                                <LanguageRow language={language} key={language.id} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    from={from}
                    to={to}
                    of={count?.count ?? -1}
                    units="Languages"
                    setFrom={setFrom}
                />
            </section>
        )
    }
}

export default LanguageListPage
