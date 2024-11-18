import { DatetimeModule } from 'src/common/datetime/datetime.module'
import { HashModule } from 'src/common/hash/hash.module'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [UsersModule, HashModule, DatetimeModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
