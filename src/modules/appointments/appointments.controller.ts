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
} from '@nestjs/common'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { AppointmentsService } from './appointments.service'
import { GetAppointmentDto } from './dto/get-appointment.dto'

@Controller({
    path: 'api/v1/appointments',
})
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return await this.appointmentsService.create({ createAppointmentDto })
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async findAll(@Query() getAppointmentDto: GetAppointmentDto) {
        return await this.appointmentsService.findAll({ getAppointmentDto })
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentsService.findOne({ by: { id } })
    }

    @Patch(':id')
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
    @HttpCode(HttpStatus.OK)
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentsService.remove({ id })
    }
}
