import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import { FormatDateTime, FORMATS } from '../../shared/utils/luxon-datetime'

@ValidatorConstraint({ async: false })
export class IsValidTimeConstraint implements ValidatorConstraintInterface {
    public validate(value: string, args: ValidationArguments): boolean {
        if (!value || typeof value !== 'string') return false

        const [format] = args.constraints

        const validationResult = FormatDateTime.isValid({
            datetime: {
                date: value,
                format,
            },
        })

        return validationResult.isValid
    }

    public defaultMessage(args: ValidationArguments): string {
        const [format] = args.constraints

        return `Invalid time format. It must comply with the format ${format}`
    }
}

export function IsValidTime(
    format: FORMATS,
    ValidationOptions?: ValidationOptions,
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: ValidationOptions,
            constraints: [format],
            validator: IsValidTimeConstraint,
        })
    }
}
