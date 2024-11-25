import { IsOptional, IsPositive } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class GetAppointmentDto {
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
