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
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common'
import { AuthJwtGuard } from 'src/core/guards/auth-jwt.guard'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { GetServiceDto } from './dto/get-service.dto'
import { ServicesService } from './services.service'

@Controller({
    path: 'api/v1/services',
})
@ApiBearerAuth()
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Servicio creado',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async create(@Body() createServiceDto: CreateServiceDto) {
        return await this.servicesService.create({ createServiceDto })
    }

    @Get()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Servicios obtenidos correctamente',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async findAll(@Query() query: GetServiceDto) {
        return await this.servicesService.findAll({ qs: query })
    }

    @Get(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Servicio encontrado',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Servicio no encontrado',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.servicesService.findOne({ by: { id } })
    }

    @Patch(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Servicio actualizado',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Servicio no encontrado',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateServiceDto: UpdateServiceDto,
    ) {
        return await this.servicesService.update({
            id,
            updateServiceDto,
        })
    }

    @Delete(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Servicio activado/desactivado',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.servicesService.remove({ id })
    }
}
