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

@Controller({
    path: 'api/v1/appointments',
})
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return await this.appointmentsService.create({ createAppointmentDto })
    }

    @Get()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    public async findAll(@Query() getAppointmentDto: GetAppointmentDto) {
        return await this.appointmentsService.findAll({ getAppointmentDto })
    }

    @Get(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentsService.findOne({ by: { id } })
    }

    @Patch(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
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
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentsService.remove({ id })
    }
}
