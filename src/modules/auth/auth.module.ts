import { ApiJwtToken } from './entities/api-jwt-token.entity'
import { UsersModule } from '../users/users.module'
import { forwardRef, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([ApiJwtToken]),
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
