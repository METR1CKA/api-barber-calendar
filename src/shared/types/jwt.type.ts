import { DateTime } from 'luxon'

export type PayloadJWT = {
    email: string
    role: string
    id: number
}

export type TokenJWT = {
    expiresAt: string | DateTime<boolean>
    issuedAt: string | DateTime<boolean>
    token: string
}
