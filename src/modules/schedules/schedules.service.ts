import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { GetScheduleDto } from './dto/get-schedule.dto'
import { Schedule } from './entities/schedule.entity'
import { UsersService } from '../users/users.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>,
        private usersService: UsersService,
    ) {}

    public async create({
        createScheduleDto,
    }: {
        createScheduleDto: CreateScheduleDto
    }) {
        if (createScheduleDto.start_time > createScheduleDto.end_time) {
            throw new BadRequestException({
                status: 'ERROR',
                message: 'La hora de inicio debe ser menor a la hora de fin',
                data: null,
            })
        }

        if (
            createScheduleDto.start_rest_time &&
            createScheduleDto.end_rest_time
        ) {
            if (
                createScheduleDto.start_rest_time >
                createScheduleDto.end_rest_time
            ) {
                throw new BadRequestException({
                    status: 'ERROR',
                    message:
                        'La hora de inicio del descanso debe ser menor a la hora de fin del descanso',
                    data: null,
                })
            }
        }

        await this.usersService.findOne({
            by: { id: createScheduleDto.user_barber_id },
        })

        const newSchedule = this.scheduleRepository.create(createScheduleDto)

        await this.scheduleRepository.save(newSchedule)

        return {
            status: 'OK',
            message: 'Horario creado',
            data: await this.scheduleRepository.findOne({
                where: { id: newSchedule.id },
                relations: ['user_barber'],
            }),
        }
    }

    public async findAll({
        getScheduleDto,
    }: {
        getScheduleDto: GetScheduleDto
    }) {
        const { page, limit } = getScheduleDto

        const schedules = await this.scheduleRepository.find({
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
            relations: ['user_barber'],
        })

        return {
            status: 'OK',
            message: 'Horarios obtenidos correctamente',
            data: schedules,
        }
    }

    public async findOne({ by }: { by: { id: number } }) {
        const schedule = await this.scheduleRepository.findOne({
            relations: ['user_barber'],
            where: by,
        })

        if (!schedule) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Horario no encontrado',
                data: null,
            })
        }

        return {
            status: 'OK',
            message: 'Horario obtenido correctamente',
            data: schedule,
        }
    }

    public async update({
        id,
        updateScheduleDto,
    }: {
        id: number
        updateScheduleDto: UpdateScheduleDto
    }) {
        if (updateScheduleDto.user_barber_id) {
            await this.usersService.findOne({
                by: { id: updateScheduleDto.user_barber_id },
            })
        }

        if (updateScheduleDto.start_time && updateScheduleDto.end_time) {
            if (updateScheduleDto.start_time > updateScheduleDto.end_time) {
                throw new BadRequestException({
                    status: 'ERROR',
                    message:
                        'La hora de inicio debe ser menor a la hora de fin',
                    data: null,
                })
            }
        }

        if (
            updateScheduleDto.start_rest_time &&
            updateScheduleDto.end_rest_time
        ) {
            if (
                updateScheduleDto.start_rest_time >
                updateScheduleDto.end_rest_time
            ) {
                throw new BadRequestException({
                    status: 'ERROR',
                    message:
                        'La hora de inicio del descanso debe ser menor a la hora de fin del descanso',
                    data: null,
                })
            }
        }

        const schedule = await this.scheduleRepository.findOne({
            where: { id },
        })

        if (!schedule) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Horario no encontrado',
                data: null,
            })
        }

        await this.usersService.findOne({
            by: { id: updateScheduleDto.user_barber_id },
        })

        const scheduleUpdated = this.scheduleRepository.merge(
            schedule,
            updateScheduleDto,
        )

        await this.scheduleRepository.save(scheduleUpdated)

        return {
            status: 'OK',
            message: 'Horario actualizado',
            data: await this.scheduleRepository.findOne({
                where: { id },
                relations: ['user_barber'],
            }),
        }
    }

    public async remove({ id }: { id: number }) {
        const schedule = await this.scheduleRepository.findOne({
            where: { id },
        })

        if (schedule) {
            const scheduleDeleted = this.scheduleRepository.merge(schedule, {
                active: !schedule.active,
            })

            await this.scheduleRepository.save(scheduleDeleted)
        }

        return {
            status: 'OK',
            message: 'Horario activado/desactivado',
            data: null,
        }
    }
}
