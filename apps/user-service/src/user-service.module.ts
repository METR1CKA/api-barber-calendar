import { ConfigModule, ConfigService } from '@nestjs/config'
import { User } from './users/entities/user.entity'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import env from '../config/env'
import * as Joi from 'joi'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/user-service/.env',
            load: [env],
            validationSchema: Joi.object({
                USER_SERVICE_HOST: Joi.string().required().default('localhost'),
                USER_SERVICE_PORT: Joi.number().required().default(3001),
                DB_CONNECTION: Joi.string().required().default('postgres'),
                DB_HOST: Joi.string().required().default('localhost'),
                DB_PORT: Joi.number().required().default(5433),
                DB_USER: Joi.string().required().default('postgres'),
                DB_PASSWORD: Joi.string().required().default('postgres'),
                DB_DB_NAME: Joi.string().required().default('db_users'),
                SYNC_DB: Joi.boolean().required().default(true),
            }),
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
                entities: [User],
                synchronize: configService.get<boolean>('env.SYNC_DB'),
            }),
        }),
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class UserServiceModule {}
