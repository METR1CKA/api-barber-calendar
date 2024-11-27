import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Appointment } from './entities/appointment.entity'
import { UsersService } from '../users/users.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { GetAppointmentDto } from './dto/get-appointment.dto'
import { ServicesService } from '../services/services.service'

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
        private usersService: UsersService,
        private servicesService: ServicesService,
    ) {}

    public async create({
        createAppointmentDto,
    }: {
        createAppointmentDto: CreateAppointmentDto
    }) {
        await this.usersService.findOne({
            by: { id: createAppointmentDto.user_barber_id },
        })

        await this.usersService.findOne({
            by: { id: createAppointmentDto.user_customer_id },
        })

        await this.servicesService.findOne({
            by: { id: createAppointmentDto.service_id },
        })

        const newAppointment =
            this.appointmentRepository.create(createAppointmentDto)

        await this.appointmentRepository.save(newAppointment)

        return {
            status: 'OK',
            message: 'Cita creada',
            data: await this.appointmentRepository.findOne({
                where: { id: newAppointment.id },
                relations: ['user_barber', 'user_customer', 'service'],
            }),
        }
    }

    public async findAll({
        getAppointmentDto,
    }: {
        getAppointmentDto: GetAppointmentDto
    }) {
        const { page, limit } = getAppointmentDto

        const appointments = await this.appointmentRepository.find({
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
            relations: ['user_barber', 'user_customer', 'service'],
        })

        return {
            status: 'OK',
            message: 'Citas obtenidas correctamente',
            data: appointments,
        }
    }

    public async findOne({ by }: { by: { id: number } }) {
        const appointment = await this.appointmentRepository.findOne({
            relations: ['user_barber', 'user_customer', 'service'],
            where: by,
        })

        if (!appointment) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Cita no encontrada',
                data: null,
            })
        }

        return {
            status: 'OK',
            message: 'Cita obtenida correctamente',
            data: appointment,
        }
    }

    public async update({
        id,
        updateAppointmentDto,
    }: {
        id: number
        updateAppointmentDto: UpdateAppointmentDto
    }) {
        if (updateAppointmentDto.user_barber_id) {
            await this.usersService.findOne({
                by: { id: updateAppointmentDto.user_barber_id },
            })
        }

        if (updateAppointmentDto.user_customer_id) {
            await this.usersService.findOne({
                by: { id: updateAppointmentDto.user_customer_id },
            })
        }

        if (updateAppointmentDto.service_id) {
            await this.servicesService.findOne({
                by: { id: updateAppointmentDto.service_id },
            })
        }

        const appointment = await this.appointmentRepository.findOne({
            where: { id },
        })

        if (!appointment) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Cita no encontrada',
                data: null,
            })
        }

        const appointmentUpdated = this.appointmentRepository.merge(
            appointment,
            updateAppointmentDto,
        )

        await this.appointmentRepository.save(appointmentUpdated)

        return {
            status: 'OK',
            message: 'Cita actualizada',
            data: await this.appointmentRepository.findOne({
                where: { id },
                relations: ['user_barber', 'user_customer', 'service'],
            }),
        }
    }

    public async remove({ id }: { id: number }) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id },
        })

        if (appointment) {
            const appointmentDeleted = this.appointmentRepository.merge(
                appointment,
                {
                    active: !appointment.active,
                },
            )

            await this.appointmentRepository.save(appointmentDeleted)
        }

        return {
            status: 'OK',
            message: 'Cita activado/desactivado',
            data: null,
        }
    }
}
