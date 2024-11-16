import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
    @IsString({
        message: 'El nombre debe ser un string',
    })
    @IsNotEmpty({
        message: 'El nombre es requerido',
    })
    public nombre: string

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
    public email: string
}
