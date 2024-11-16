import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    Query,
    ParseIntPipe,
} from '@nestjs/common'
import { TASK_SERVICE, USER_SERVICE } from 'apps/api-gateway/config/services'
import { ParseObjectIdPipePipe } from './pipes/parse-object-id-pipe.pipe'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { GetUsersDto } from '../users/dto/get-users.dto'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { catchError, firstValueFrom } from 'rxjs'
import { ObjectId } from 'mongoose'

@Controller('tasks')
export class TasksController {
    constructor(
        @Inject(TASK_SERVICE) private taskClient: ClientProxy,
        @Inject(USER_SERVICE) private userClient: ClientProxy,
    ) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        let existUser = false

        try {
            await firstValueFrom(
                this.userClient.send(
                    { cmd: 'get_user' },
                    { id: createTaskDto.userId },
                ),
            )

            existUser = true
        } catch (error) {
            throw new RpcException(error)
        }

        return await firstValueFrom(
            this.taskClient.send({ cmd: 'create_task' }, createTaskDto).pipe(
                catchError((error) => {
                    throw new RpcException(error)
                }),
            ),
        )
    }

    @Get()
    async findAll(@Query() query: GetUsersDto) {
        return await firstValueFrom(
            this.taskClient.send({ cmd: 'get_tasks' }, query).pipe(
                catchError((error) => {
                    throw new RpcException(error)
                }),
            ),
        )
    }

    @Get(':userId')
    async findOne(
        @Param('userId', ParseIntPipe) userId: number,
        @Query() query: GetUsersDto,
    ) {
        let existUser = false

        try {
            await firstValueFrom(
                this.userClient.send({ cmd: 'get_user' }, { id: userId }),
            )

            existUser = true
        } catch (error) {
            throw new RpcException(error)
        }

        return await firstValueFrom(
            this.taskClient
                .send({ cmd: 'get_task_by_user_id' }, { userId, ...query })
                .pipe(
                    catchError((error) => {
                        throw new RpcException(error)
                    }),
                ),
        )
    }

    @Patch(':_id')
    async update(
        @Param('_id', ParseObjectIdPipePipe) _id: ObjectId,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return await firstValueFrom(
            this.taskClient
                .send({ cmd: 'update_task' }, { _id, ...updateTaskDto })
                .pipe(
                    catchError((error) => {
                        throw new RpcException(error)
                    }),
                ),
        )
    }

    @Delete(':_id')
    async remove(@Param('_id', ParseObjectIdPipePipe) _id: ObjectId) {
        return await firstValueFrom(
            this.taskClient.send({ cmd: 'delete_task' }, { _id }).pipe(
                catchError((error) => {
                    throw new RpcException(error)
                }),
            ),
        )
    }
}
