export class Language {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
}

export class AddLanguageRequest {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

export class GetLanguageSuggestionsRequest {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

export class RemoveLanguageRequest {
    id: number

    constructor(id: number) {
        this.id = id
    }
}
