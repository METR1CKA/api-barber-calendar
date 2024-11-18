import { IsOptional, IsPositive } from 'class-validator'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Type } from 'class-transformer'

@ApiSchema({ name: 'GetRoleDto' })
export class GetRoleDto {
    @ApiProperty({
        required: false,
        default: 1,
        type: Number,
        description: 'Page number',
    })
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    public page?: number = 1

    @ApiProperty({
        required: false,
        default: 10,
        type: Number,
        description: 'Number of items per page',
    })
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    public limit?: number = 10
}
