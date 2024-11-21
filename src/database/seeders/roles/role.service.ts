import { Role, RoleEnum } from '../../../modules/roles/entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseSeederService } from '../base.seeder'
import { DeepPartial, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RoleService extends BaseSeederService<Role> {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {
        super()
    }

    protected get repository(): Repository<Role> {
        return this.roleRepository
    }

    protected get data(): Promise<DeepPartial<Role>[]> {
        const valuesEnum = Object.values(RoleEnum)

        return Promise.resolve(
            valuesEnum.map((value) => ({
                name: value,
                description: value.toLowerCase(),
            })),
        )
    }

    protected getIdentity(entity: DeepPartial<Role>) {
        return entity.name
    }
}
