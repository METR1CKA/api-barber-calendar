import { ApiJwtToken } from './entities/api-jwt-token.entity'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [TypeOrmModule.forFeature([ApiJwtToken]), UsersModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
