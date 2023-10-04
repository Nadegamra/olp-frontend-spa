import { CourseLanguage } from './CourseLanguage'
import { CourseRequirement } from './CourseRequirement'
import { CourseSubtitle } from './CourseSubtitle'
import { GainedSkill } from './GainedSkill'
import { ActivityFormat } from './enums/ActivityFormat'
import { Difficulty } from './enums/Difficulty'
import { ScheduleType } from './enums/ScheduleType'

export class CourseResponse {
    id: number
    userId: number
    name: string
    shortDescription: string
    detailedDescription: string
    lengthInDays: number
    price: number
    grantsCertificate: boolean
    certificatePrice: number
    activityFormat: ActivityFormat
    scheduleType: ScheduleType
    difficulty: Difficulty
    requirements: CourseRequirement[]
    gainedSkills: GainedSkill[]
    languages: CourseLanguage[]
    subtitles: CourseSubtitle[]

    constructor(
        id: number,
        userId: number,
        name: string,
        shortDescription: string,
        detailedDescription: string,
        lengthInDays: number,
        price: number,
        grantsCertificate: boolean,
        certificatePrice: number,
        activityFormat: ActivityFormat,
        scheduleType: ScheduleType,
        difficulty: Difficulty,
        requirements: CourseRequirement[],
        gainedSkills: GainedSkill[],
        languages: CourseLanguage[],
        subtitles: CourseSubtitle[]
    ) {
        this.id = id
        this.userId = userId
        this.name = name
        this.shortDescription = shortDescription
        this.detailedDescription = detailedDescription
        this.lengthInDays = lengthInDays
        this.price = price
        this.grantsCertificate = grantsCertificate
        this.certificatePrice = certificatePrice
        this.activityFormat = activityFormat
        this.scheduleType = scheduleType
        this.difficulty = difficulty
        this.requirements = requirements
        this.gainedSkills = gainedSkills
        this.languages = languages
        this.subtitles = subtitles
    }
}

export class CourseResponseOwner extends CourseResponse {
    isHidden: boolean

    constructor(
        id: number,
        userId: number,
        name: string,
        shortDescription: string,
        detailedDescription: string,
        lengthInDays: number,
        price: number,
        grantsCertificate: boolean,
        certificatePrice: number,
        activityFormat: ActivityFormat,
        scheduleType: ScheduleType,
        difficulty: Difficulty,
        requirements: CourseRequirement[],
        gainedSkills: GainedSkill[],
        languages: CourseLanguage[],
        subtitles: CourseSubtitle[],
        isHidden: boolean
    ) {
        super(
            id,
            userId,
            name,
            shortDescription,
            detailedDescription,
            lengthInDays,
            price,
            grantsCertificate,
            certificatePrice,
            activityFormat,
            scheduleType,
            difficulty,
            requirements,
            gainedSkills,
            languages,
            subtitles
        )
        this.isHidden = isHidden
    }
}

export class CourseCreateRequest {
    name: string
    shortDescription: string
    detailedDescription: string
    lengthInDays: number
    price: number
    grantsCertificate: boolean
    certificatePrice: number
    activityFormat: ActivityFormat
    scheduleType: ScheduleType
    difficulty: Difficulty

    constructor(
        name: string,
        shortDescription: string,
        detailedDescription: string,
        lengthInDays: number,
        price: number,
        grantsCertificate: boolean,
        certificatePrice: number,
        activityFormat: ActivityFormat,
        scheduleType: ScheduleType,
        difficulty: Difficulty
    ) {
        this.name = name
        this.shortDescription = shortDescription
        this.detailedDescription = detailedDescription
        this.lengthInDays = lengthInDays
        this.price = price
        this.grantsCertificate = grantsCertificate
        this.certificatePrice = certificatePrice
        this.activityFormat = activityFormat
        this.scheduleType = scheduleType
        this.difficulty = difficulty
    }
}

interface CourseUpdateRequestArgs {
    id: number
    name?: string
    shortDescription?: string
    detailedDescription?: string
    lengthInDays?: number
    price?: number
    grantsCertificate?: boolean
    certificatePrice?: number
    activityFormat?: ActivityFormat
    scheduleType?: ScheduleType
    difficulty?: Difficulty
    isHidden?: boolean
}

export class CourseUpdateRequest {
    id: number
    name?: string
    shortDescription?: string
    detailedDescription?: string
    lengthInDays?: number
    price?: number
    grantsCertificate?: boolean
    certificatePrice?: number
    activityFormat?: ActivityFormat
    scheduleType?: ScheduleType
    difficulty?: Difficulty
    isHidden?: boolean

    constructor({
        id,
        name,
        shortDescription,
        detailedDescription,
        lengthInDays,
        price,
        grantsCertificate,
        certificatePrice,
        activityFormat,
        scheduleType,
        difficulty,
        isHidden
    }: CourseUpdateRequestArgs) {
        this.id = id
        this.name = name
        this.shortDescription = shortDescription
        this.detailedDescription = detailedDescription
        this.lengthInDays = lengthInDays
        this.price = price
        this.grantsCertificate = grantsCertificate
        this.certificatePrice = certificatePrice
        this.activityFormat = activityFormat
        this.scheduleType = scheduleType
        this.difficulty = difficulty
        this.isHidden = isHidden
    }
}

export class CourseGetListRequest {
    phrase: string
    skip: number
    take: number

    constructor(phrase: string = '', skip: number = 0, take: number = 20) {
        this.phrase = phrase
        this.skip = skip
        this.take = take
    }
}
