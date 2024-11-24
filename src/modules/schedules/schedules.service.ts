import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { Schedule } from './entities/schedule.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>,
    ) {}

    public async create({
        createScheduleDto,
    }: {
        createScheduleDto: CreateScheduleDto
    }) {
        const newSchedule = this.scheduleRepository.create(createScheduleDto)

        await this.scheduleRepository.save(newSchedule)

        return {
            status: 'OK',
            message: 'Horario creado',
            data: await this.scheduleRepository.findOne({
                where: { id: newSchedule.id },
            }),
        }
    }

    findAll() {}

    findOne(id: number) {}

    update(id: number, updateScheduleDto: UpdateScheduleDto) {}

    remove(id: number) {}
}
