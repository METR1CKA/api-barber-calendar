import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@mail.com',
        required: true,
        format: 'email',
        nullable: false,
        type: 'string',
        title: 'email',
    })
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

    @ApiProperty({
        description: 'Username del usuario',
        example: 'username',
        required: true,
        format: 'string',
        nullable: false,
        type: 'string',
        title: 'username',
    })
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

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password',
        required: true,
        format: 'string',
        nullable: false,
        type: 'string',
        title: 'password',
    })
    @IsString({
        message: 'La contraseña debe ser un string',
    })
    @IsNotEmpty({
        message: 'La contraseña es requerida',
    })
    @MaxLength(150, {
        message: 'La contraseña debe tener menos de 150 caracteres',
    })
    public password: string

    @ApiProperty({
        description: 'Nombre',
        example: 'name',
        required: true,
        format: 'string',
        nullable: false,
        type: 'string',
        title: 'name',
    })
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

    @ApiProperty({
        description: 'Apellido',
        example: 'lastname',
        required: true,
        format: 'string',
        nullable: false,
        type: 'string',
        title: 'lastname',
    })
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
