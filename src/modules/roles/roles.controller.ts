import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpStatus,
    Query,
    ParseIntPipe,
} from '@nestjs/common'
import { CreateRoleDto } from '../../dtos/roles/create-role.dto'
import { UpdateRoleDto } from '../../dtos/roles/update-role.dto'
import { GetRoleDto } from 'src/dtos/roles/get-roles.dto'
import { RolesService } from './roles.service'
import { Response } from 'express'

@Controller({
    path: 'api/v1/roles',
})
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    async create(
        @Body() createRoleDto: CreateRoleDto,
        @Res() response: Response,
    ): Promise<Response> {
        const newRole = await this.rolesService.create({ createRoleDto })

        return response.status(HttpStatus.CREATED).json({
            status: 'OK',
            message: 'Role created',
            data: newRole,
        })
    }

    @Get()
    async findAll(
        @Query() query: GetRoleDto,
        @Res() response: Response,
    ): Promise<Response> {
        const roles = await this.rolesService.findAll({ qs: query })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Roles found',
            data: roles,
        })
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ): Promise<Response> {
        const role = await this.rolesService.findOne({
            by: { id },
        })

        if (!role) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'Role not found',
                data: null,
            })
        }

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Role found',
            data: role,
        })
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoleDto: UpdateRoleDto,
        @Res() response: Response,
    ): Promise<Response> {
        const role = await this.rolesService.findOne({
            by: { id },
        })

        if (!role) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'Role not found',
                data: null,
            })
        }

        const updatedRole = await this.rolesService.update({
            updateRoleDto,
            role,
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Role updated',
            data: updatedRole,
        })
    }

    @Delete(':id')
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ): Promise<Response> {
        const role = await this.rolesService.findOne({
            by: { id },
        })

        if (role) {
            await this.rolesService.remove({ role })
        }

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Role removed',
            data: null,
        })
    }
}
