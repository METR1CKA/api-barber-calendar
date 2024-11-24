import { IsOptional, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

export class GetRoleDto {
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    public page?: number = 1

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    public limit?: number = 10
}
