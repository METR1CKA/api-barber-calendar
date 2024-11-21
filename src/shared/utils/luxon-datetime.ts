import { DateTime } from 'luxon'

export class FormatDateTime {
    private static fullFormat: string = 'yyyy-MM-dd HH:mm:ss'
    private static localZone: string = 'America/Monterrey'
    private static shortFormat: string = 'yyyy-MM-dd'

    public static getLocalZone(): string {
        return this.localZone
    }

    public static getFullFormat() {
        return this.fullFormat
    }

    public static getDateFormat() {
        return this.shortFormat
    }

    public static setLocalZone({
        zone = 'America/Monterrey',
    }: {
        zone: string
    }): void {
        this.localZone = zone
    }

    public static setFullFormat({
        format = 'yyyy-MM-dd HH:mm:ss',
    }: {
        format: string
    }): void {
        this.fullFormat = format
    }

    public static setShortFormat({
        format = 'yyyy-MM-dd',
    }: {
        format: string
    }): void {
        this.shortFormat = format
    }

    public static now(): DateTime {
        return DateTime.now().setZone(this.localZone)
    }

    public static isValid({
        timezone,
        datetime,
    }: {
        timezone?: string
        datetime?: { date: string; format: string }
    }) {
        const datetimeObject = datetime
            ? DateTime.fromFormat(datetime.date, datetime.format)
            : DateTime.now()

        const { isValid, invalidReason, invalidExplanation } =
            datetimeObject.setZone(timezone ?? this.localZone)

        return {
            isValid,
            invalidReason,
            invalidExplanation,
        }
    }

    public static jwtTimestamp({
        iat,
        exp,
        toFormat = false,
    }: {
        iat: number
        exp: number
        toFormat?: boolean
    }) {
        const issuedAt = DateTime.fromSeconds(iat).setZone(this.localZone)
        const expiresAt = DateTime.fromSeconds(exp).setZone(this.localZone)

        return {
            issued_at: toFormat ? issuedAt.toFormat(this.fullFormat) : issuedAt,
            expires_at: toFormat
                ? expiresAt.toFormat(this.fullFormat)
                : expiresAt,
        }
    }
}
