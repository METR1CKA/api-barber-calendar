import { Role } from '../../../modules/roles/entities/role.entity'
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
        return Promise.resolve([])
    }

    protected getIdentity(entity: DeepPartial<Role>) {
        return entity.name
    }
}
