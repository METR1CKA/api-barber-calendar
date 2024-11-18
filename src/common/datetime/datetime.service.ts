import { Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'

@Injectable()
export class DatetimeService {
    private localZone: string
    private fullFormat: string
    private shortFormat: string

    constructor() {
        this.localZone = 'America/Monterrey'
        this.fullFormat = 'yyyy-MM-dd HH:mm:ss'
        this.shortFormat = 'yyyy-MM-dd'
    }

    public getLocalZone(): string {
        return this.localZone
    }

    public getFullFormat() {
        return this.fullFormat
    }

    public getDateFormat() {
        return this.shortFormat
    }

    public isValidZone({ zone }: { zone: string }) {
        const { isValid, invalidReason, invalidExplanation } =
            DateTime.now().setZone(zone)

        return {
            isValid,
            invalidReason,
            invalidExplanation,
        }
    }

    public setLocalZone({
        zone = 'America/Monterrey',
    }: {
        zone: string
    }): void {
        this.localZone = zone
    }

    public setFullFormat({
        format = 'yyyy-MM-dd HH:mm:ss',
    }: {
        format: string
    }): void {
        this.fullFormat = format
    }

    public setShortFormat({ format = 'yyyy-MM-dd' }: { format: string }): void {
        this.shortFormat = format
    }

    public now(): DateTime {
        return DateTime.now().setZone(this.localZone)
    }

    public isValidDateTime({ date, format }: { date: string; format: string }) {
        const { isValid, invalidReason } = DateTime.fromFormat(
            date,
            format,
        ).setZone(this.localZone)

        return {
            isValid,
            invalidReason,
        }
    }

    public getConvertedTimestampToDateTime({
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
