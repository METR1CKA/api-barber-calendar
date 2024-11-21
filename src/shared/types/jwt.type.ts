import { DateTime } from 'luxon'

export type PayloadJWT = {
    email: string
    role: string
    sub: number
    iat?: number
    exp?: number
}

export type TokenJWT = {
    expires_at: string | DateTime<boolean>
    issued_at: string | DateTime<boolean>
    token: string
}
