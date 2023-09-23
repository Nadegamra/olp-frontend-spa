import { useParams } from 'react-router-dom'
import Modal from '../../../../components/layout/Modal'
import {
    useAddGainedSkillMutation,
    useGetGainedSkillListQuery
} from '../../../../features/api/ApiSliceGainedSkills'
import InputField from '../../../../components/forms/InputField'
import { useState } from 'react'
import { useGetSkillsSuggestionsQuery } from '../../../../features/api/ApiSliceSkill'
import { GainedSkillCreateRequest } from '../../../../dtos/GainedSkill'

function CourseGainedSkillsList() {
    const { id } = useParams()
    const [search, setSearch] = useState<string>('')
    const { isSuccess: isSuccessGained, data: gainedSkills } = useGetGainedSkillListQuery(
        parseInt(id ?? '-1')
    )
    const {
        data: skills,
        isFetching: isFetchingSkills,
        isSuccess: isSuccessSkills
    } = useGetSkillsSuggestionsQuery(search)
    const [addGainedSkill] = useAddGainedSkillMutation()
    return (
        <>
            <div className="border p-5 rounded-lg mb-5 grid grid-cols-3 gap-2">
                {(isSuccessGained &&
                    gainedSkills.length > 0 &&
                    gainedSkills.map((skill) => (
                        <div key={skill.id} className="flex p-3 bg-clr-bg2 ">
                            {skill.skill.name}
                        </div>
                    ))) || <div>Nothing here</div>}
            </div>
            <Modal toggleButtonText="Add Skills">
                <div className="bg-clr-bg3 p-10 rounded-xl border w-max">
                    <div className="border p-5 rounded-lg mb-5 w-[500px] h-[200px]">
                        {isSuccessGained &&
                            gainedSkills.length > 0 &&
                            gainedSkills.map((skill) => (
                                <div key={skill.id}>{skill.skill.name}</div>
                            ))}
                    </div>
                    <InputField
                        text={''}
                        label={'Search'}
                        placeholder={'Search skills'}
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearch(e.target.value)
                        }
                    />
                    <div className="border border-clr-text3 rounded-md p-3 grid grid-cols-3 grid-rows-10 gap-3 auto-cols-max">
                        {!isFetchingSkills &&
                            isSuccessSkills &&
                            (skills?.length > 0 ? (
                                skills?.map((sugg) => (
                                    <div className="flex p-3 bg-clr-bg2" key={sugg.id}>
                                        <span>{sugg.name}</span>
                                        <span className="flex-1" />
                                        <span
                                            className="material-symbols-outlined cursor-pointer"
                                            onClick={() => {
                                                addGainedSkill(
                                                    new GainedSkillCreateRequest(
                                                        parseInt(id ?? '-1'),
                                                        sugg.id,
                                                        ''
                                                    )
                                                )
                                            }}>
                                            add
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div>No results found</div>
                            ))}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CourseGainedSkillsList
