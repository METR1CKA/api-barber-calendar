import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

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
    public name: string

    @IsString({
        message: 'La descripción del role debe ser un string',
    })
    @IsOptional()
    public description?: string | null
}
