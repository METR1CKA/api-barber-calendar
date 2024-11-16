import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from 'class-validator'

export class CreateTaskDto {
    @IsNumber(
        {},
        {
            message: 'El userId debe ser un numero',
        },
    )
    @IsPositive({
        message: 'El userId debe ser un numero positivo',
    })
    @IsNotEmpty({
        message: 'El userId es requerido',
    })
    public userId: number

    @IsString({
        message: 'El titulo debe ser un string',
    })
    @IsNotEmpty({
        message: 'El titulo es requerido',
    })
    public titulo: string

    @IsString({
        message: 'La descripcion debe ser un string',
    })
    @IsNotEmpty({
        message: 'La descripcion es requerida',
    })
    public descripcion: string

    @IsEnum(['PENDIENTE', 'EN PROGRESO', 'COMPLETADA'], {
        message: `Estado debe ser 'PENDIENTE', 'EN PROGRESO' o 'COMPLETADA'`,
    })
    @IsNotEmpty({
        message: 'El estado es requerido',
    })
    public estado: string
}
