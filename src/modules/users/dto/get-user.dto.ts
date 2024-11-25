import { ApiPropertyOptional, ApiSchema } from '@nestjs/swagger'
import { IsOptional, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

@ApiSchema({ name: 'GetUsersDto' })
export class GetUsersDto {
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    public page?: number = 1

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    public limit?: number = 10
}
