import { ApiProperty } from '@nestjs/swagger'
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from 'class-validator'
import { IsValidTime } from 'src/core/decorators/is-valid-time.decorator'
import { FORMATS } from 'src/shared/utils/luxon-datetime'

export class CreateAppointmentDto {
    @IsNotEmpty({
        message: 'El id del usuario barbero es requerido',
    })
    @IsNumber(
        {},
        {
            message: 'El id del usuario barbero debe ser un numero',
        },
    )
    @IsPositive({
        message: 'El id del usuario barbero debe ser un numero positivo',
    })
    @ApiProperty()
    public user_barber_id: number

    @IsNotEmpty({
        message: 'El id del usuario cliente es requerido',
    })
    @IsNumber(
        {},
        {
            message: 'El id del usuario cliente debe ser un numero',
        },
    )
    @IsPositive({
        message: 'El id del usuario cliente debe ser un numero positivo',
    })
    @ApiProperty()
    public user_customer_id: number

    @IsNotEmpty({
        message: 'El id del servicio es requerido',
    })
    @IsNumber(
        {},
        {
            message: 'El id del servicio debe ser un numero',
        },
    )
    @IsPositive({
        message: 'El id del servicio debe ser un numero positivo',
    })
    @ApiProperty()
    public service_id: number

    @IsNotEmpty({
        message: 'La fecha de la cita es requerida',
    })
    @IsString({
        message: 'La fecha de la cita debe ser un string',
    })
    @IsValidTime(FORMATS.FULL, {
        message: `La fecha de la cita debe tener el formato ${FORMATS.FULL}`,
    })
    @ApiProperty()
    public appointment_date: string

    @IsNotEmpty({
        message: 'El status de la cita es requerido',
    })
    @IsBoolean({
        message: 'El status de la cita debe ser un booleano',
    })
    @ApiProperty()
    public status: boolean
}
