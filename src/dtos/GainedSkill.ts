import { SkillResponse } from './Skill'

export class GainedSkill {
    id: number
    courseId: number
    skillId: number
    skill: SkillResponse
    customDescription: string

    constructor(
        id: number,
        courseId: number,
        skillId: number,
        skill: SkillResponse,
        customDescription: string
    ) {
        this.id = id
        this.courseId = courseId
        this.skillId = skillId
        this.skill = skill
        this.customDescription = customDescription
    }
}

export class GainedSkillResponse {
    id: number
    courseId: number
    skillId: number
    customDescription: string

    constructor(id: number, courseId: number, skillId: number, customDescription: string) {
        this.id = id
        this.courseId = courseId
        this.skillId = skillId
        this.customDescription = customDescription
    }
}

export class GainedSkillCreateRequest {
    courseId: number
    skillId: number
    customDescription: string

    constructor(courseId: number, skillId: number, customDescription: string) {
        this.courseId = courseId
        this.skillId = skillId
        this.customDescription = customDescription
    }
}

export class GainedSkillDeleteRequest {
    courseId: number
    id: number

    constructor(courseId: number, id: number) {
        this.courseId = courseId
        this.id = id
    }
}

export class GainedSkillUpdateRequest {
    id: number
    courseId: number
    customDescription: string

    constructor(id: number, courseId: number, customDescription: string) {
        this.id = id
        this.courseId = courseId
        this.customDescription = customDescription
    }
}
