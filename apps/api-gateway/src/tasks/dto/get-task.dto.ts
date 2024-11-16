import { IsOptional, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

export class GetTasksDto {
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    public page?: number = 1

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    public limit?: number = 10

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    public userId?: number
}
