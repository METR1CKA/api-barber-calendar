import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

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
    @MaxLength(20, {
        message: 'La contraseña debe tener menos de 20 caracteres',
    })
    @MinLength(6, {
        message: 'La contraseña debe tener al menos 6 caracteres',
    })
    @Transform(({ value }) => value.trim().split(' ').join(''))
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

    @ApiProperty({
        description: 'Rol del usuario',
        example: 1,
        required: true,
        format: 'number',
        nullable: false,
        type: 'number',
        title: 'role_id',
    })
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
    public roleId: number
}
