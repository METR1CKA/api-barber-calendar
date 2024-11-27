import { Service } from 'src/modules/services/entities/service.entity'
import { User } from '../../modules/users/entities/user.entity'
import { Role } from '../../modules/roles/entities/role.entity'
import { ServicesService } from './services/services.service'
import { UserService } from './users/user.service'
import { RoleService } from './roles/role.service'
import { SeederService } from './seeder.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
    providers: [SeederService, UserService, RoleService, ServicesService],
    exports: [SeederService, UserService, RoleService, ServicesService],
    imports: [TypeOrmModule.forFeature([User, Role, Service])],
})
export class SeederModule {}
