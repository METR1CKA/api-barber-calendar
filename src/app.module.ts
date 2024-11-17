import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { SchedulesModule } from './schedules/schedules.module'
import { AppoimentsModule } from './appoiments/appoiments.module'
import { ServicesModule } from './services/services.module'
import env from 'config/env'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [env],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<any>('env.DB_CONNECTION'),
                host: configService.get<string>('env.DB_HOST'),
                port: Number(configService.get<number>('env.DB_PORT')),
                username: configService.get<string>('env.DB_USER'),
                password: configService.get<string>('env.DB_PASSWORD'),
                database: configService.get<string>('env.DB_DB_NAME'),
                entities: [],
                synchronize: configService.get<boolean>('env.SYNC_DB'),
                // synchronize: false,
            }),
        }),
        UsersModule,
        RolesModule,
        SchedulesModule,
        AppoimentsModule,
        ServicesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
