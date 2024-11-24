import { SchedulesController } from './schedules.controller'
import { SchedulesService } from './schedules.service'
import { Schedule } from './entities/schedule.entity'
import { UsersModule } from '../users/users.module'
import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forFeature([Schedule]),
        forwardRef(() => UsersModule),
        forwardRef(() => AuthModule),
    ],
    controllers: [SchedulesController],
    providers: [SchedulesService],
    exports: [SchedulesService],
})
export class SchedulesModule {}
