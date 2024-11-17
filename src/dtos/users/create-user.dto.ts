import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

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
}
