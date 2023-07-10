import { Language } from './enums/Language'

export class CourseSubtitle {
    id: number
    courseId: number
    language: Language

    constructor(id: number, courseId: number, language: Language) {
        this.id = id
        this.courseId = courseId
        this.language = language
    }
}

export class CourseSubtitleCreateRequest {
    courseId: number
    language: Language

    constructor(courseId: number, language: Language) {
        this.courseId = courseId
        this.language = language
    }
}

export class CourseSubtitleDeleteRequest {
    courseId: number
    id: number

    constructor(courseId: number, id: number) {
        this.courseId = courseId
        this.id = id
    }
}
