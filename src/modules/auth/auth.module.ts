import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
