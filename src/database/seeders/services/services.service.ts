import { Service } from 'src/modules/services/entities/service.entity'
import { BaseSeederService } from '../base.seeder'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ServicesService extends BaseSeederService<Service> {
    constructor(
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,
    ) {
        super()
    }

    protected get repository(): Repository<Service> {
        return this.serviceRepository
    }

    protected get data(): Promise<DeepPartial<Service>[]> {
        return Promise.resolve([
            {
                name: 'Corte Clásico',
                description:
                    'Corte de cabello tradicional con acabado profesional.',
                price: 25.0,
                duration: 30,
            },
            {
                name: 'Corte Moderno',
                description:
                    'Estilo moderno con técnicas avanzadas para un look contemporáneo.',
                price: 30.0,
                duration: 40,
            },
            {
                name: 'Afeitado Clásico',
                description:
                    'Afeitado al ras con toalla caliente y productos premium.',
                price: 20.0,
                duration: 25,
            },
            {
                name: 'Corte y Afeitado',
                description:
                    'Combo de corte de cabello y afeitado clásico al ras.',
                price: 45.0,
                duration: 60,
            },
            {
                name: 'Perfilado de Barba',
                description:
                    'Alineado y recorte de barba para un look bien definido.',
                price: 18.0,
                duration: 20,
            },
            {
                name: 'Arreglo de Cejas',
                description:
                    'Perfilado profesional de cejas para un acabado limpio.',
                price: 10.0,
                duration: 15,
            },
            {
                name: 'Tratamiento Capilar',
                description:
                    'Tratamiento hidratante o anticaspa para cuero cabelludo saludable.',
                price: 35.0,
                duration: 45,
            },
            {
                name: 'Masaje Capilar',
                description:
                    'Masaje relajante en el cuero cabelludo con aceites esenciales.',
                price: 15.0,
                duration: 20,
            },
            {
                name: 'Corte Infantil',
                description:
                    'Corte de cabello especial para niños con atención personalizada.',
                price: 20.0,
                duration: 30,
            },
            {
                name: 'Paquete Premium',
                description:
                    'Incluye corte, afeitado, perfilado de barba, y tratamiento capilar.',
                price: 70.0,
                duration: 90,
            },
        ])
    }

    protected getIdentity(entity: Service): any {
        return entity.name
    }
}
