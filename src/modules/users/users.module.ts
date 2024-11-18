import { HashModule } from 'src/common/hash/hash.module'
import { UsersController } from './users.controller'
import { RolesModule } from '../roles/roles.module'
import { User } from '../../entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule, HashModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
