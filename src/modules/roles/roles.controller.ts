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
import { GetRoleDto } from 'src/modules/roles/dto/get-roles.dto'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RolesService } from './roles.service'
import { Response } from 'express'

@Controller({
    path: 'api/v1/roles',
})
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    public async create(
        @Body() createRoleDto: CreateRoleDto,
        @Res() response: Response,
    ): Promise<Response> {
        const newRole = await this.rolesService.create({ createRoleDto })

        return response.status(HttpStatus.CREATED).json({
            status: 'OK',
            message: 'Rol creado',
            data: newRole,
        })
    }

    @Get()
    public async findAll(
        @Query() query: GetRoleDto,
        @Res() response: Response,
    ): Promise<Response> {
        const roles = await this.rolesService.findAll({ qs: query })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Roles obtenidos correctamente',
            data: roles,
        })
    }

    @Get(':id')
    public async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ): Promise<Response> {
        const role = await this.rolesService.findOne({
            by: { id },
        })

        if (!role) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'Rol no encontrado',
                data: null,
            })
        }

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Rol encontrado',
            data: role,
        })
    }

    @Patch(':id')
    public async update(
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
                message: 'Rol no encontrado',
                data: null,
            })
        }

        const updatedRole = await this.rolesService.update({
            updateRoleDto,
            role,
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Rol actualizado',
            data: updatedRole,
        })
    }

    @Delete(':id')
    public async remove(
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
            message: 'Rol activado/desactivado',
            data: null,
        })
    }
}
