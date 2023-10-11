export class Section {
    id: number
    courseId: number
    name: string
    description: string
    isHidden: boolean

    constructor(
        id: number,
        courseId: number,
        name: string,
        description: string,
        isHidden: boolean
    ) {
        this.id = id
        this.courseId = courseId
        this.name = name
        this.description = description
        this.isHidden = isHidden
    }
}

export class SectionAddRequest {
    name: string
    description: string

    constructor(name: string, description: string) {
        this.name = name
        this.description = description
    }
}

export class SectionUpdateRequest {
    name?: string
    description?: string
    isHidden?: boolean

    constructor(name: string, description: string, isHidden: boolean) {
        this.name = name
        this.description = description
        this.isHidden = isHidden
    }
}
