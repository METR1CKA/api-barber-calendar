import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    Res,
    HttpStatus,
} from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUsersDto } from './dto/get-users.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: 'create_user' })
    async create(@Payload() createUserDto: CreateUserDto) {
        const userExists = await this.usersService.findOne({
            email: createUserDto.email,
            // active: true,
        })

        if (userExists) {
            throw new RpcException({
                message: 'User already exists',
                status: HttpStatus.BAD_REQUEST,
            })
        }

        const newUser = await this.usersService.create({ createUserDto })

        return {
            message: 'User created',
            data: newUser,
        }
    }

    @MessagePattern({ cmd: 'get_users' })
    async findAll(@Payload() query: GetUsersDto) {
        const users = await this.usersService.findAll({ qs: query })
        return { message: 'Users found', data: users }
    }

    @MessagePattern({ cmd: 'get_user' })
    async findOne(@Payload('id') id: number) {
        const user = await this.usersService.findOne({ id })

        if (!user) {
            throw new RpcException({
                message: 'User not found',
                status: HttpStatus.NOT_FOUND,
            })
        }

        return { message: 'User found', data: user }
    }

    @MessagePattern({ cmd: 'update_user' })
    async update(@Payload() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.findOne({ id: updateUserDto.id })

        if (!user) {
            throw new RpcException({
                message: 'User not found',
                status: HttpStatus.NOT_FOUND,
            })
        }

        const userUpdated = await this.usersService.update({
            user,
            updateUserDto,
        })

        return {
            message: 'User updated',
            data: userUpdated,
        }
    }

    @MessagePattern({ cmd: 'delete_user' })
    async remove(@Payload('id', ParseIntPipe) id: number) {
        const user = await this.usersService.findOne({ id })

        if (!user) {
            throw new RpcException({
                message: 'User not found',
                status: HttpStatus.NOT_FOUND,
            })
        }

        await this.usersService.remove({ user })

        return {
            message: 'User deleted',
        }
    }
}
