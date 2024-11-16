import { IsNotEmpty, IsString } from 'class-validator'
import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateTaskDto } from './create-task.dto'
import { ObjectId } from 'mongoose'

export class UpdateTaskDto extends OmitType(PartialType(CreateTaskDto), [
    'userId',
]) {
    @IsString({
        message: 'El id debe ser un string',
    })
    @IsNotEmpty({
        message: 'El id es requerido',
    })
    public _id: ObjectId
}
