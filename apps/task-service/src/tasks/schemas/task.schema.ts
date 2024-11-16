import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Task extends Document {
    @Prop({
        required: true,
    })
    public userId: number

    @Prop({
        required: true,
    })
    public titulo: string

    @Prop({
        required: true,
    })
    public descripcion: string

    @Prop({
        required: true,
        enum: ['PENDIENTE', 'EN PROGRESO', 'COMPLETADA'],
        default: 'PENDIENTE',
    })
    public estado: string

    // Propiedad active para desactivar tareas en lugar de eliminarlas
    /* @Prop({
        required: true,
        default: true,
    })
    public active: boolean */
}

export const TaskSchema = SchemaFactory.createForClass(Task)
