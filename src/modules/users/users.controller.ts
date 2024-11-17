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
import { CreateUserDto } from 'src/dtos/users/create-user.dto'
import { UpdateUserDto } from 'src/dtos/users/update-user.dto'
import { GetUsersDto } from 'src/dtos/users/get-users.dto'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { Response } from 'express'

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User created',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                name: { type: 'string' },
                                email: { type: 'string' },
                                active: { type: 'boolean' },
                            },
                        },
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'User already exists',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: { default: null },
                    },
                },
            },
        },
    })
    async create(
        @Body() createUserDto: CreateUserDto,
        @Res() response: Response,
    ): Promise<Response> {
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
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Users found',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    active: { type: 'boolean' },
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async findAll(
        @Query() query: GetUsersDto,
        @Res() response: Response,
    ): Promise<Response> {
        const users = await this.usersService.findAll({ qs: query })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Users found',
            data: users,
        })
    }

    @Get(':id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User found',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                name: { type: 'string' },
                                email: { type: 'string' },
                                active: { type: 'boolean' },
                            },
                        },
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'User not found',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: { default: null },
                    },
                },
            },
        },
    })
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ): Promise<Response> {
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
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User updated',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                name: { type: 'string' },
                                email: { type: 'string' },
                                active: { type: 'boolean' },
                            },
                        },
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'User not found',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: { default: null },
                    },
                },
            },
        },
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Res() response: Response,
    ): Promise<Response> {
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
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User removed',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: { default: null },
                    },
                },
            },
        },
    })
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ): Promise<Response> {
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
