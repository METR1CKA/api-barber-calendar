import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {
    @IsString({
        message: 'El email debe ser un string',
    })
    @IsEmail(
        {},
        {
            message: 'El email debe ser un email valido',
        },
    )
    @IsNotEmpty({
        message: 'El email es requerido',
    })
    @MaxLength(150, {
        message: 'El email debe tener menos de 150 caracteres',
    })
    public email: string

    @IsString({
        message: 'El username debe ser un string',
    })
    @IsNotEmpty({
        message: 'El username es requerido',
    })
    @MaxLength(150, {
        message: 'El username debe tener menos de 150 caracteres',
    })
    public username: string

    @IsString({
        message: 'La contraseña debe ser un string',
    })
    @IsNotEmpty({
        message: 'La contraseña es requerida',
    })
    @MaxLength(20, {
        message: 'La contraseña debe tener menos de 20 caracteres',
    })
    @MinLength(8, {
        message: 'La contraseña debe tener al menos 8 caracteres',
    })
    @Transform(({ value }) => value.trim().split(' ').join(''))
    public password: string

    @IsString({
        message: 'El nombre debe ser un string',
    })
    @IsNotEmpty({
        message: 'El nombre es requerido',
    })
    @MaxLength(150, {
        message: 'El nombre debe tener menos de 150 caracteres',
    })
    public name: string

    @IsString({
        message: 'El apellido debe ser un string',
    })
    @IsNotEmpty({
        message: 'El apellido es requerido',
    })
    @MaxLength(150, {
        message: 'El apellido debe tener menos de 150 caracteres',
    })
    public lastname: string

    @IsNotEmpty({
        message: 'El rol es requerido',
    })
    @IsNumber(
        {},
        {
            message: 'El rol debe ser un numero',
        },
    )
    @IsPositive({
        message: 'El rol debe ser un numero positivo',
    })
    public role_id: number
}
