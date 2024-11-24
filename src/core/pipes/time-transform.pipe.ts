import { FormatDateTime, FORMATS } from 'src/shared/utils/luxon-datetime'
import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class TimeTransformPipe implements PipeTransform {
    public transform(value: any) {
        if (!value || typeof value !== 'object') {
            return value
        }

        const valuesEntries = Object.entries(value) // [ [key, value], ... ]

        const valuesFiltered = valuesEntries.filter(([key]) =>
            key.includes('_time'),
        )

        const valuesMapped = valuesFiltered.map(([key, value]) => [
            key,
            FormatDateTime.fromFormat({
                date: value as string,
                format: FORMATS.TIME,
            }),
        ])

        const valuesMappedToObject = Object.fromEntries(valuesMapped)

        const newValues = Object.assign(value, valuesMappedToObject)

        return newValues
    }
}
