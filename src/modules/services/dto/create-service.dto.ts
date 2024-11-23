import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
} from 'class-validator'

export class CreateServiceDto {
    @IsNotEmpty({
        message: 'El nombre es requerido',
    })
    @IsString({
        message: 'El nombre debe ser un texto',
    })
    @MaxLength(150, {
        message: 'El nombre no puede ser mayor a 150 caracteres',
    })
    public name: string

    @IsOptional()
    @IsString({
        message: 'La descripción debe ser un texto',
    })
    public description?: string

    @IsNotEmpty({
        message: 'El precio es requerido',
    })
    @IsNumber(
        {},
        {
            message: 'El precio debe ser un número',
        },
    )
    @IsPositive({
        message: 'El precio debe ser un número positivo',
    })
    public price: number
}
