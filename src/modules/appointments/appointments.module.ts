import { AppointmentsController } from './appointments.controller'
import { AppointmentsService } from './appointments.service'
import { Appointment } from './entities/appointment.entity'
import { forwardRef, Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServicesModule } from '../services/services.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Appointment]),
        forwardRef(() => ServicesModule),
        forwardRef(() => UsersModule),
        forwardRef(() => AuthModule),
    ],
    controllers: [AppointmentsController],
    providers: [AppointmentsService],
    exports: [AppointmentsService],
})
export class AppointmentsModule {}
