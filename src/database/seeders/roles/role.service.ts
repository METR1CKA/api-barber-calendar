import { User } from '../../../modules/users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseSeederService } from '../base.seeder'
import { DeepPartial, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RoleService extends BaseSeederService<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super()
    }

    protected get repository(): Repository<User> {
        return this.userRepository
    }

    protected get data(): Promise<DeepPartial<User>[]> {
        return
    }

    protected getIdentity(entity: DeepPartial<User>) {
        return entity.email
    }
}
