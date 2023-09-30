import { Language } from './Language'

export class CourseSubtitle {
    id: number
    courseId: number
    languageId: number
    language: Language

    constructor(id: number, courseId: number, languageId: number, language: Language) {
        this.id = id
        this.courseId = courseId
        this.languageId = languageId
        this.language = language
    }
}

export class CourseSubtitleCreateRequest {
    courseId: number
    languageId: number

    constructor(courseId: number, languageId: number) {
        this.courseId = courseId
        this.languageId = languageId
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
