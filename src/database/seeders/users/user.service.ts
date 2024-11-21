import { User } from '../../../modules/users/entities/user.entity'
import { Role } from '../../../modules/roles/entities/role.entity'
import { BaseSeederService } from '../base.seeder'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService extends BaseSeederService<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {
        super()
    }

    protected get repository(): Repository<User> {
        return this.userRepository
    }

    protected get data(): Promise<DeepPartial<User>[]> {
        const users = this.roleRepository.find().then((roles) =>
            roles.map((role) => ({
                role_id: role.id,
                email: `${role.description}@barber.com`,
                password: bcrypt.hashSync(`${role.description}.pass123`, 10),
                username: `${role.name}`,
                name: `${role.name}`,
                lastname: `${role.name}`,
            })),
        )

        return Promise.resolve(users)
    }

    protected getIdentity(entity: User): any {
        return entity.email
    }
}
