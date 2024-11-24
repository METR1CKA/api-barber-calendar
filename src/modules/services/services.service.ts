import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { GetServiceDto } from './dto/get-service.dto'
import { Service } from './entities/service.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
    ) {}

    public async create({
        createServiceDto,
    }: {
        createServiceDto: CreateServiceDto
    }) {
        const service = this.serviceRepository.create(createServiceDto)

        await this.serviceRepository.save(service)

        return {
            status: 'OK',
            message: 'Servicio creado',
            data: await this.serviceRepository.findOne({
                where: { id: service.id },
            }),
        }
    }

    public async findAll({ qs }: { qs: GetServiceDto }) {
        const { page, limit } = qs

        const services = await this.serviceRepository.find({
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
        })

        return {
            status: 'OK',
            message: 'Servicios obtenidos correctamente',
            data: services,
        }
    }

    public async findOne({ by }: { by: { id: number } }) {
        const service = await this.serviceRepository.findOne({ where: by })

        if (!service) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Servicio no encontrado',
                data: null,
            })
        }

        return {
            status: 'OK',
            message: 'Servicio encontrado',
            data: service,
        }
    }

    public async update({
        id,
        updateServiceDto,
    }: {
        id: number
        updateServiceDto: UpdateServiceDto
    }) {
        const service = await this.serviceRepository.findOne({ where: { id } })

        if (!service) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Servicio no encontrado',
                data: null,
            })
        }

        const serviceUpdated = this.serviceRepository.merge(
            service,
            updateServiceDto,
        )

        await this.serviceRepository.save(serviceUpdated)

        return {
            status: 'OK',
            message: 'Servicio actualizado',
            data: await this.serviceRepository.findOne({
                where: { id: serviceUpdated.id },
            }),
        }
    }

    public async remove({ id }: { id: number }) {
        const service = await this.serviceRepository.findOne({ where: { id } })

        if (service) {
            const serviceDeleted = this.serviceRepository.merge(service, {
                active: !service.active,
            })

            await this.serviceRepository.save(serviceDeleted)
        }

        return {
            status: 'OK',
            message: 'Servicio activado/desactivado',
            data: null,
        }
    }
}
