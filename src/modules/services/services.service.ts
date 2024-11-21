import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { Service } from './entities/service.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
    ) {}

    public async create({}: { createServiceDto: CreateServiceDto }) {}

    findAll() {
        return `This action returns all services`
    }

    findOne(id: number) {
        return `This action returns a #${id} service`
    }

    update(id: number, updateServiceDto: UpdateServiceDto) {
        return `This action updates a #${id} service`
    }

    remove(id: number) {
        return `This action removes a #${id} service`
    }
}
