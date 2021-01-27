import { User } from "./User";

export interface User_Profile{
    id: string
    created_at: string
    updated_at: string
    username: string
    bio: string
    about: string
    avatar: string

    // What type?
    social_links: any
    user: User
}

export const getUserProfileData = async (id:string):Promise<User_Profile> => {
    return {
        id,
        created_at: new Date().toString(),
        updated_at: new Date().toString(),
        username: "Admin",
        bio: "string",
        about: "Hello Everyone! Welcome!",
        avatar: "https://t1.daumcdn.net/cfile/tistory/99B97B505CEB7FD712",

        // What type?
        social_links: {},
        user: {
            id,
            created_at: new Date().toString(),
            updated_at: new Date().toString(),
            provider: "github",
            social_id: "string",
            email: "string",
            is_verified: true
        }
    }
}