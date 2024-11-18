import { UsersController } from './users.controller'
import { RolesModule } from '../roles/roles.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { Module } from '@nestjs/common'

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
