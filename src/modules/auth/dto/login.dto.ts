import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
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
    @ApiProperty()
    public email: string

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
    @ApiProperty()
    public password: string
}
