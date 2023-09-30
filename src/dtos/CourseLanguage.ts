import { Language } from './Language'

export class CourseLanguage {
    id: number
    courseId: number
    languageId: number
    language: Language
    isPrimary: boolean

    constructor(
        id: number,
        courseId: number,
        languageId: number,
        language: Language,
        isPrimary: boolean
    ) {
        this.id = id
        this.courseId = courseId
        this.languageId = languageId
        this.language = language
        this.isPrimary = isPrimary
    }
}

export class CourseLanguageCreateRequest {
    courseId: number
    languageId: number

    constructor(courseId: number, languageId: number) {
        this.courseId = courseId
        this.languageId = languageId
    }
}

export class CourseLanguageDeleteRequest {
    courseId: number
    id: number

    constructor(courseId: number, id: number) {
        this.courseId = courseId
        this.id = id
    }
}

export class CourseLanguageSetPrimaryRequest {
    courseId: number
    id: number

    constructor(courseId: number, id: number) {
        this.courseId = courseId
        this.id = id
    }
}
