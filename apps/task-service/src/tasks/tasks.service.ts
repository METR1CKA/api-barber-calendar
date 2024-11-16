import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { GetTasksDto } from './dto/get-task.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Task } from './schemas/task.schema'
import { Injectable } from '@nestjs/common'
import { Model, ObjectId } from 'mongoose'

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

    async create({ createTaskDto }: { createTaskDto: CreateTaskDto }) {
        const newTask = new this.taskModel(createTaskDto)
        return await newTask.save()
    }

    async findAll({ qs, userId }: { qs: GetTasksDto; userId?: number }) {
        const { page, limit } = qs

        // let query = { active: true }

        return await this.taskModel
            .find(
                userId ? { userId } : {},
                // userId ? { ...query, userId } : query,
            )
            .skip(limit * (page - 1))
            .limit(limit)
            .sort({ _id: 'desc' })
            .exec()
    }

    async findOne({ _id }: { _id: ObjectId }) {
        return await this.taskModel.findById(_id).exec()
    }

    async update({ updateTaskDto }: { updateTaskDto: UpdateTaskDto }) {
        const { _id, ...payload } = updateTaskDto

        return await this.taskModel.findByIdAndUpdate(_id, payload, {
            new: true,
            runValidators: true,
        })
    }

    async remove({ task }: { task: Task }) {
        return await this.taskModel.findByIdAndDelete(task._id).exec()
    }
}
