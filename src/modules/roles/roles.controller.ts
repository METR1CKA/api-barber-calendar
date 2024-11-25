import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    Query,
    ParseIntPipe,
    HttpCode,
    UseGuards,
} from '@nestjs/common'
import { ApiResponseType } from 'src/shared/types/api-response.type'
import { AuthJwtGuard } from 'src/core/guards/auth-jwt.guard'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { GetRoleDto } from './dto/get-role.dto'
import { RolesService } from './roles.service'
import { Role } from './entities/role.entity'

@Controller({
    path: 'api/v1/roles',
})
@ApiBearerAuth()
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Rol creado',
    })
    public async create(
        @Body() createRoleDto: CreateRoleDto,
    ): Promise<ApiResponseType<Role>> {
        return await this.rolesService.create({ createRoleDto })
    }

    @Get()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Roles obtenidos correctamente',
    })
    public async findAll(
        @Query() query: GetRoleDto,
    ): Promise<ApiResponseType<Role[]>> {
        return await this.rolesService.findAll({ qs: query })
    }

    @Get(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Rol encontrado',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Rol no encontrado',
    })
    public async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ApiResponseType<Role | null>> {
        return await this.rolesService.findOne({ by: { id } })
    }

    @Patch(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Rol actualizado',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Rol no encontrado',
    })
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoleDto: UpdateRoleDto,
    ): Promise<ApiResponseType<Role | null>> {
        return await this.rolesService.update({ id, updateRoleDto })
    }

    @Delete(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Rol activado/desactivado',
    })
    public async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ApiResponseType<null>> {
        return await this.rolesService.remove({ id })
    }
}
