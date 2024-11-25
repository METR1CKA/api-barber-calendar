import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
    @IsString({
        message: 'El nombre del role debe ser un string',
    })
    @IsNotEmpty({
        message: 'El nombre del role es requerido',
    })
    @MaxLength(150, {
        message: 'El nombre del role debe tener menos de 150 caracteres',
    })
    @ApiProperty()
    public name: string

    @IsString({
        message: 'La descripción del role debe ser un string',
    })
    @IsOptional()
    @ApiProperty()
    public description?: string | null
}
