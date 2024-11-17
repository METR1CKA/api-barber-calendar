import { ClientsModule, Transport } from '@nestjs/microservices'
import { USER_SERVICE } from 'apps/api-gateway/config/service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersController } from './users.controller'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        ClientsModule.registerAsync([
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
    controllers: [UsersController],
    providers: [],
})
export class UsersModule {}
