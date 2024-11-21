import { User } from '../../modules/users/entities/user.entity'
import { Role } from '../../modules/roles/entities/role.entity'
import { UserService } from './users/user.service'
import { RoleService } from './roles/role.service'
import { SeederService } from './seeder.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
    providers: [SeederService, UserService, RoleService],
    exports: [SeederService, UserService, RoleService],
    imports: [TypeOrmModule.forFeature([User, Role])],
})
export class SeederModule {}
