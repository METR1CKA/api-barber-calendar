import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator'
import { IsValidTime } from 'src/core/decorators/is-valid-time.decorator'
import { FORMATS } from 'src/shared/utils/luxon-datetime'
import { STATUS } from '../entities/appointment.entity'

export class CreateAppointmentDto {
    @IsOptional({
        message: 'El id de la cita es opcional',
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
    @ApiPropertyOptional()
    public user_barber_id?: number

    @IsOptional({
        message: 'El id de la cita es opcional',
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
    @ApiPropertyOptional()
    public user_customer_id?: number

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
    @IsEnum(STATUS, {
        message: `El status de la cita debe ser uno de los siguientes valores: ${Object.values(
            STATUS,
        ).join(', ')}`,
    })
    @ApiProperty()
    public status: STATUS
}
