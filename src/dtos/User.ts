export class User {
    id: number
    username: string
    email: string
    emailConfirmed: boolean

    constructor(id: number, username: string, email: string, emailConfirmed: boolean) {
        this.id = id
        this.username = username
        this.email = email
        this.emailConfirmed = emailConfirmed
    }
}

export class LoginRequestDTO {
    email: string
    password: string
    rememberPassword: boolean

    constructor(email: string, password: string, rememberPassword: boolean) {
        this.email = email
        this.password = password
        this.rememberPassword = rememberPassword
    }
}

export class RenewTokenRequestDTO {
    userId: string
    refreshToken: string

    constructor(userId: string, refreshToken: string) {
        this.userId = userId
        this.refreshToken = refreshToken
    }
}

export class LoginResponseDTO {
    userId: string
    accessToken: string
    refreshToken: string

    constructor(userId: string, accessToken: string, refreshToken: string) {
        this.userId = userId
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }
}

export class RegisterDTO {
    email: string
    password: string
    role: UserRole

    constructor(email: string, password: string, role: UserRole) {
        this.email = email
        this.password = password
        this.role = role
    }
}

export enum UserRole {
    Creator = 2,
    Consumer = 3
}
