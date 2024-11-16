import { TASK_SERVICE, USER_SERVICE } from 'apps/api-gateway/config/services'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TasksController } from './tasks.controller'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: TASK_SERVICE,
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>(
                            'env.TASK_SERVICE_HOST',
                        ),
                        port: configService.get<number>(
                            'env.TASK_SERVICE_PORT',
                        ),
                    },
                }),
            },
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: USER_SERVICE,
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>(
                            'env.USER_SERVICE_HOST',
                        ),
                        port: configService.get<number>(
                            'env.USER_SERVICE_PORT',
                        ),
                    },
                }),
            },
        ]),
    ],
    controllers: [TasksController],
    providers: [],
})
export class TasksModule {}
