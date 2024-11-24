import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'
import { IsValidTime } from 'src/core/decorators/is-valid-time.decorator'
import { FORMATS } from 'src/shared/utils/luxon-datetime'

export class CreateScheduleDto {
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
    public user_barber_id: number

    @IsNotEmpty({
        message: 'La hora de inicio es requerida',
    })
    @IsString({
        message: 'La hora de inicio debe ser un string',
    })
    @IsValidTime(FORMATS.TIME, {
        message: `La hora de inicio debe tener el formato ${FORMATS.TIME}`,
    })
    public start_time: string

    @IsNotEmpty({
        message: 'La hora de fin es requerida',
    })
    @IsString({
        message: 'La hora de fin debe ser un string',
    })
    @IsValidTime(FORMATS.TIME, {
        message: `La hora de fin debe tener el formato ${FORMATS.TIME}`,
    })
    public end_time: string

    @IsNotEmpty({
        message: 'La hora de inicio de descanso es requerida',
    })
    @IsString({
        message: 'La hora de inicio de descanso debe ser un string',
    })
    @IsValidTime(FORMATS.TIME, {
        message: `La hora de inicio de descanso debe tener el formato ${FORMATS.TIME}`,
    })
    public start_rest_time: string

    @IsNotEmpty({
        message: 'La hora de fin de descanso es requerida',
    })
    @IsString({
        message: 'La hora de fin de descanso debe ser un string',
    })
    @IsValidTime(FORMATS.TIME, {
        message: `La hora de fin de descanso debe tener el formato ${FORMATS.TIME}`,
    })
    public end_rest_time: string

    @IsNotEmpty({
        message: 'El dia es requerido',
    })
    @IsNumber(
        {},
        {
            message: 'El dia debe ser un numero',
        },
    )
    @IsPositive({
        message: 'El dia debe ser un numero positivo',
    })
    public day: number
}
