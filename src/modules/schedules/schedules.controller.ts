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
} from '@nestjs/common'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { SchedulesService } from './schedules.service'

@Controller({
    path: 'api/v1/schedules',
})
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createScheduleDto: CreateScheduleDto) {
        return await this.schedulesService.create({ createScheduleDto })
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async findAll() {}

    @Get(':id')
    findOne(@Param('id') id: string) {}

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateScheduleDto: UpdateScheduleDto,
    ) {}

    @Delete(':id')
    remove(@Param('id') id: string) {}
}
