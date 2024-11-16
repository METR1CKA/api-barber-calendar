import { TasksController } from './tasks.controller'
import { TaskSchema } from './schemas/task.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { TasksService } from './tasks.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Task',
                schema: TaskSchema,
            },
        ]),
    ],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
