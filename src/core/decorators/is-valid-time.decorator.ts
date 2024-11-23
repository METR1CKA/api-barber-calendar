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
        const format = args.constraints[0]

        const validationResult = FormatDateTime.isValid({
            datetime: {
                date: value,
                format,
            },
        })

        return validationResult.isValid
    }

    public defaultMessage(args: ValidationArguments): string {
        const format = args.constraints[0]

        return `The value "${args.value}" is not valid. It must comply with the format ${format}`
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
