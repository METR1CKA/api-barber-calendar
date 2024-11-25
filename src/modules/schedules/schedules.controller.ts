import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { AuthJwtGuard } from 'src/core/guards/auth-jwt.guard'
import { GetScheduleDto } from './dto/get-schedule.dto'
import { SchedulesService } from './schedules.service'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'

@Controller({
    path: 'api/v1/schedules',
})
@ApiBearerAuth()
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @Post()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Horario creado',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async create(@Body() createScheduleDto: CreateScheduleDto) {
        return await this.schedulesService.create({ createScheduleDto })
    }

    @Get()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Horarios obtenidos correctamente',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async findAll(@Query() getScheduleDto: GetScheduleDto) {
        return await this.schedulesService.findAll({ getScheduleDto })
    }

    @Get(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Horario obtenido correctamente',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Horario no encontrado',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.schedulesService.findOne({ by: { id } })
    }

    @Patch(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Horario actualizado correctamente',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Horario no encontrado',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateScheduleDto: UpdateScheduleDto,
    ) {
        return await this.schedulesService.update({ id, updateScheduleDto })
    }

    @Delete(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Horario eliminado correctamente',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.schedulesService.remove({ id })
    }
}
