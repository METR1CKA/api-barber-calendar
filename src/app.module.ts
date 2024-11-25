import { RequestLogMiddleware } from './core/middleware/request-log.middleware'
import { AppointmentsModule } from './modules/appointments/appointments.module'
import { TimezoneMiddleware } from './core/middleware/timezone.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { SchedulesModule } from './modules/schedules/schedules.module'
import { ServicesModule } from './modules/services/services.module'
import { SeederModule } from './database/seeders/seeder.module'
import { dataSourceOptions } from './config/data-source.config'
import { UsersModule } from './modules/users/users.module'
import { RolesModule } from './modules/roles/roles.module'
import { AuthModule } from './modules/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { jwtConfig } from './config/jwt.config'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import env from './config/env.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            envFilePath: '.env',
            isGlobal: true,
            load: [env],
        }),
        TypeOrmModule.forRoot(dataSourceOptions),
        JwtModule.register(jwtConfig),
        UsersModule,
        RolesModule,
        AuthModule,
        SeederModule,
        ServicesModule,
        AppointmentsModule,
        SchedulesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLogMiddleware).forRoutes('*')
        consumer.apply(TimezoneMiddleware).forRoutes('*')
    }
}
