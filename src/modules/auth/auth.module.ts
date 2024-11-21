import { ApiJwtToken } from './entities/api-jwt-token.entity'
import { User } from '../users/entities/user.entity'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [TypeOrmModule.forFeature([ApiJwtToken, User])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
