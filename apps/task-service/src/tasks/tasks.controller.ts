import { Controller, HttpStatus } from '@nestjs/common'
import { ParseObjectIdPipePipe } from './pipes/parse-object-id-pipe.pipe'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { GetTasksDto } from './dto/get-task.dto'
import { TasksService } from './tasks.service'
import { ObjectId } from 'mongoose'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @MessagePattern({ cmd: 'create_task' })
    async create(@Payload() createTaskDto: CreateTaskDto) {
        const task = await this.tasksService.create({ createTaskDto })

        return {
            message: 'Task created successfully',
            data: task,
        }
    }

    @MessagePattern({ cmd: 'get_tasks' })
    async findAll(@Payload() payload: GetTasksDto) {
        const { userId, ...query } = payload

        const tasks = await this.tasksService.findAll({ qs: query })

        return {
            message: 'Tasks found',
            data: tasks,
        }
    }

    @MessagePattern({ cmd: 'get_task_by_user_id' })
    async findAllByUserId(@Payload() payload: GetTasksDto) {
        const { userId, ...query } = payload

        const tasks = await this.tasksService.findAll({
            qs: query,
            userId,
        })

        if (tasks.length === 0) {
            throw new RpcException({
                message: 'Tasks not found',
                status: HttpStatus.NOT_FOUND,
            })
        }

        return {
            message: 'Tasks found',
            data: tasks,
        }
    }

    @MessagePattern({ cmd: 'update_task' })
    async update(@Payload() updateTaskDto: UpdateTaskDto) {
        const task = await this.tasksService.findOne({ _id: updateTaskDto._id })

        if (!task) {
            throw new RpcException({
                message: 'Task not found',
                status: HttpStatus.NOT_FOUND,
            })
        }

        const newTask = await this.tasksService.update({ updateTaskDto })

        return {
            message: 'Task updated successfully',
            data: newTask,
        }
    }

    @MessagePattern({ cmd: 'delete_task' })
    async remove(@Payload('_id', ParseObjectIdPipePipe) _id: ObjectId) {
        const task = await this.tasksService.findOne({ _id })

        if (!task) {
            throw new RpcException({
                message: 'Task not found',
                status: HttpStatus.NOT_FOUND,
            })
        }

        await this.tasksService.remove({ task })

        return {
            message: 'Task removed successfully',
        }
    }
}
