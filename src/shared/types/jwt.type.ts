import { DateTime } from 'luxon'

export type PayloadJWT = {
    email: string
    role: string
    sub: number
    iat?: number
    exp?: number
}

export type TokenJWT = {
    expiresAt: string | DateTime<boolean>
    issuedAt: string | DateTime<boolean>
    token: string
}
