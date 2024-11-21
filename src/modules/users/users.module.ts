import { UsersController } from './users.controller'
import { RolesModule } from '../roles/roles.module'
import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => RolesModule),
        forwardRef(() => AuthModule),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
