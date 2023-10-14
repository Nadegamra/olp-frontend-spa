export class InfoPage {
    id: number
    sectionId: number
    name: string
    text: string
    isHidden: boolean

    constructor(id: number, sectionId: number, name: string, text: string, isHidden: boolean) {
        this.id = id
        this.sectionId = sectionId
        this.name = name
        this.text = text
        this.isHidden = isHidden
    }
}

export class InfoPageUpdateRequest {
    name: string
    text: string
    isHidden: boolean

    constructor(name: string, text: string, isHidden: boolean) {
        this.name = name
        this.text = text
        this.isHidden = isHidden
    }
}

export class InfoPageAddRequest {
    name?: string
    text?: string
    isHidden?: boolean

    constructor(name: string, text: string, isHidden: boolean) {
        this.name = name
        this.text = text
        this.isHidden = isHidden
    }
}
