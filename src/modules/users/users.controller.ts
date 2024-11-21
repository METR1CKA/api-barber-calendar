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
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { RolesService } from '../roles/roles.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUsersDto } from './dto/get-users.dto'
import { UsersService } from './users.service'
import { Response } from 'express'

@Controller({
    path: 'api/v1/users',
})
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
    ) {}

    @Post()
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Usuario creado',
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
                                email: { type: 'string' },
                                username: { type: 'string' },
                                name: { type: 'string' },
                                lastname: { type: 'string' },
                                id: { type: 'number' },
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
        description: 'Ya existe un usuario con este correo',
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
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Rol no encontrado',
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
    public async create(
        @Body() createUserDto: CreateUserDto,
        @Res() response: Response,
    ): Promise<Response> {
        const userExists = await this.usersService.findOne({
            by: {
                email: createUserDto.email,
                active: true,
            },
        })

        if (userExists) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                status: 'ERROR',
                message: 'Ya existe un usuario con este correo',
                data: null,
            })
        }

        const role = await this.rolesService.findOne({
            by: {
                id: createUserDto.role_id,
            },
        })

        if (!role) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'Rol no encontrado',
                data: null,
            })
        }

        const newUser = await this.usersService.create({ createUserDto })

        return response.status(HttpStatus.CREATED).json({
            status: 'OK',
            message: 'Usuario creado',
            data: newUser,
        })
    }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuarios obtenidos correctamente',
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
    public async findAll(
        @Query() query: GetUsersDto,
        @Res() response: Response,
    ): Promise<Response> {
        const users = await this.usersService.findAll({ qs: query })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Usuarios obtenidos correctamente',
            data: users,
        })
    }

    @Get(':id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario encontrado',
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
        description: 'Usuario no encontrado',
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
    public async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ): Promise<Response> {
        const user = await this.usersService.findOne({
            by: { id },
        })

        if (!user) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'Usuario no encontrado',
                data: null,
            })
        }

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Usuario encontrado',
            data: user,
        })
    }

    @Patch(':id')
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario actualizado',
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
        description: 'Usuario no encontrado',
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
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Res() response: Response,
    ): Promise<Response> {
        const user = await this.usersService.findOne({
            by: { id },
        })

        if (!user) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'Usuario no encontrado',
                data: null,
            })
        }

        if (updateUserDto.role_id) {
            const role = await this.rolesService.findOne({
                by: {
                    id: updateUserDto.role_id,
                },
            })

            if (!role) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    status: 'ERROR',
                    message: 'Rol no encontrado',
                    data: null,
                })
            }
        }

        const updatedUser = await this.usersService.update({
            updateUserDto,
            user,
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Usuario actualizado',
            data: updatedUser,
        })
    }

    @Delete(':id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario activado/desactivado',
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
    public async remove(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ): Promise<Response> {
        const user = await this.usersService.findOne({
            by: { id },
        })

        if (user) {
            await this.usersService.remove({ user })
        }

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'User activado/desactivado',
            data: null,
        })
    }
}
