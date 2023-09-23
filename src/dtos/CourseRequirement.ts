import { SkillResponse } from './Skill'

export class CourseRequirement {
    id: number
    courseId: number
    skillId: number
    skill: SkillResponse
    customDescription?: string

    constructor(
        id: number,
        courseId: number,
        skillId: number,
        skill: SkillResponse,
        customDescription?: string
    ) {
        this.id = id
        this.courseId = courseId
        this.skillId = skillId
        this.skill = skill
        this.customDescription = customDescription
    }
}

export class CourseRequirementCreateRequest {
    courseId: number
    skillId: number
    customDescription: string

    constructor(courseId: number, skillId: number, customDescription: string) {
        this.courseId = courseId
        this.skillId = skillId
        this.customDescription = customDescription
    }
}

export class CourseRequirementDeleteRequest {
    courseId: number
    id: number

    constructor(courseId: number, id: number) {
        this.courseId = courseId
        this.id = id
    }
}

export class CourseRequirementUpdateRequest {
    courseId: number
    id: number
    customDescription: string

    constructor(courseId: number, id: number, customDescription: string) {
        this.courseId = courseId
        this.id = id
        this.customDescription = customDescription
    }
}
