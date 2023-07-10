export class CreatorResponse {
    username: string
    email: string
    bio: string
    website: string

    constructor(username: string, email: string, bio: string, website: string) {
        this.username = username
        this.email = email
        this.bio = bio
        this.website = website
    }
}

export class CreatorUpdateRequest {
    bio: string
    website: string

    constructor(bio: string, website: string) {
        this.bio = bio
        this.website = website
    }
}
