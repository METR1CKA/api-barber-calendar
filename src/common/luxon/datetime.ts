import { DateTime } from 'luxon'

export class FormatDateTime {
    private static localZone: string = 'America/Monterrey'
    private static fullFormat: string = 'yyyy-MM-dd HH:mm:ss'
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

    public static isValidZone({ zone }: { zone: string }) {
        const { isValid, invalidReason, invalidExplanation } =
            DateTime.now().setZone(zone)

        return {
            isValid,
            invalidReason,
            invalidExplanation,
        }
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

    public static isValidDateTime({
        date,
        format,
    }: {
        date: string
        format: string
    }) {
        const { isValid, invalidReason } = DateTime.fromFormat(
            date,
            format,
        ).setZone(this.localZone)

        return {
            isValid,
            invalidReason,
        }
    }

    public static getConvertedTimestampToDateTime({
        timestamp,
        format,
        zone,
    }: {
        timestamp: number
        format?: string
        zone?: string
    }) {
        return DateTime.fromSeconds(timestamp)
            .setZone(zone ?? this.localZone)
            .toFormat(format ?? this.fullFormat)
    }
}
