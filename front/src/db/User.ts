export type PROVIDER = "local" | "google" | "github" | "facebook";

export interface User{
    id: string
    created_at: string
    updated_at: string
    provider: PROVIDER
    social_id: string
    email: string
    is_verified: boolean
}