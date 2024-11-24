import { SchedulesController } from './schedules.controller'
import { SchedulesService } from './schedules.service'
import { Schedule } from './entities/schedule.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
    imports: [TypeOrmModule.forFeature([Schedule])],
    controllers: [SchedulesController],
    providers: [SchedulesService],
})
export class SchedulesModule {}
