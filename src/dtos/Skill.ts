export class SkillCreateRequest {
    name: string
    description: string

    constructor(name: string, description: string) {
        this.name = name
        this.description = description
    }
}

export class SkillResponse {
    id: number
    name: string
    description: string

    constructor(id: number, name: string, description: string) {
        this.id = id
        this.name = name
        this.description = description
    }
}

export class SkillUpdateRequest {
    id: number
    name: string
    description: string

    constructor(id: number, name: string, description: string) {
        this.id = id
        this.name = name
        this.description = description
    }
}

export class SkillListRequest {
    skip: number
    take: number

    constructor(skip: number, take: number) {
        this.skip = skip
        this.take = take
    }
}

export class SkillCountResponse {
    count: number

    constructor(count: number) {
        this.count = count
    }
}
