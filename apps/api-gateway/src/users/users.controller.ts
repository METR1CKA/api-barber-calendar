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
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { USER_SERVICE } from 'apps/api-gateway/config/services'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUsersDto } from './dto/get-users.dto'
import { catchError, firstValueFrom } from 'rxjs'

@Controller('users')
export class UsersController {
    constructor(@Inject(USER_SERVICE) private userClient: ClientProxy) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await firstValueFrom(
            this.userClient.send({ cmd: 'create_user' }, createUserDto).pipe(
                catchError((error) => {
                    throw new RpcException(error)
                }),
            ),
        )
    }

    @Get()
    async findAll(@Query() query: GetUsersDto) {
        return await firstValueFrom(
            this.userClient.send({ cmd: 'get_users' }, query).pipe(
                catchError((error) => {
                    throw new RpcException(error)
                }),
            ),
        )
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(
            this.userClient.send({ cmd: 'get_user' }, { id }).pipe(
                catchError((error) => {
                    throw new RpcException(error)
                }),
            ),
        )
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await firstValueFrom(
            this.userClient
                .send({ cmd: 'update_user' }, { id, ...updateUserDto })
                .pipe(
                    catchError((error) => {
                        throw new RpcException(error)
                    }),
                ),
        )
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(
            this.userClient.send({ cmd: 'delete_user' }, { id }).pipe(
                catchError((error) => {
                    throw new RpcException(error)
                }),
            ),
        )
    }
}
