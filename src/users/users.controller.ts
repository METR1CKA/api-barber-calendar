import {
    Controller,
    HttpStatus,
    Delete,
    Param,
    Patch,
    Post,
    Body,
    Get,
    Res,
    Query,
    ParseIntPipe,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUsersDto } from './dto/get-users.dto'
import { UsersService } from './users.service'
import { Response } from 'express'

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(
        @Body() createUserDto: CreateUserDto,
        @Res() response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const userExists = await this.usersService.findOne({
            email: createUserDto.email,
            active: true,
        })

        if (userExists) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                status: 'ERROR',
                message: 'User already exists',
                data: null,
            })
        }

        const newUser = await this.usersService.create({ createUserDto })

        return response.status(HttpStatus.CREATED).json({
            status: 'OK',
            message: 'User created',
            data: newUser,
        })
    }

    @Get()
    async findAll(
        @Query() query: GetUsersDto,
        @Res() response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const users = await this.usersService.findAll({ qs: query })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Users found',
            data: users,
        })
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ) {
        const user = await this.usersService.findOne({ id })

        if (!user) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'User not found',
                data: null,
            })
        }

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'User found',
            data: user,
        })
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Res() response: Response,
    ) {
        const user = await this.usersService.findOne({ id })

        if (!user) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'User not found',
                data: null,
            })
        }

        const updatedUser = await this.usersService.update({
            user,
            updateUserDto,
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'User updated',
            data: updatedUser,
        })
    }

    @Delete(':id')
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ) {
        const user = await this.usersService.findOne({
            id,
        })

        if (user) {
            await this.usersService.remove({ user })
        }

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'User removed',
            data: null,
        })
    }
}
