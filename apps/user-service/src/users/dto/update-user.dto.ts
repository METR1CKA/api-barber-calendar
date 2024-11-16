import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNumber(
        {},
        {
            message: 'El id debe ser un número',
        },
    )
    @IsPositive({
        message: 'El id debe ser un número positivo',
    })
    @IsNotEmpty({
        message: 'El id es requerido',
    })
    id: number
}
