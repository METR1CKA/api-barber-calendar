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
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { GetAppointmentDto } from './dto/get-appointment.dto'
import { AuthJwtGuard } from 'src/core/guards/auth-jwt.guard'
import { AppointmentsService } from './appointments.service'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'

@Controller({
    path: 'api/v1/appointments',
})
@ApiBearerAuth()
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Cita creada',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return await this.appointmentsService.create({ createAppointmentDto })
    }

    @Get()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Citas obtenidas correctamente',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async findAll(@Query() getAppointmentDto: GetAppointmentDto) {
        return await this.appointmentsService.findAll({ getAppointmentDto })
    }

    @Get(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Cita obtenida correctamente',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Cita no encontrada',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentsService.findOne({ by: { id } })
    }

    @Patch(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Cita actualizada',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Cita no encontrada',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAppointmentDto: UpdateAppointmentDto,
    ) {
        return await this.appointmentsService.update({
            id,
            updateAppointmentDto,
        })
    }

    @Delete(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Cita activado/desactivado',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentsService.remove({ id })
    }
}
