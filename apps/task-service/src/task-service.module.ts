import { ConfigModule, ConfigService } from '@nestjs/config'
import { TasksModule } from './tasks/tasks.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import env from '../config/env'
import * as Joi from 'joi'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/task-service/.env',
            load: [env],
            validationSchema: Joi.object({
                TASK_SERVICE_HOST: Joi.string().required().default('localhost'),
                TASK_SERVICE_PORT: Joi.number().required().default(3002),
                MONGO_URI: Joi.string()
                    .required()
                    .default('mongodb://localhost:27017/db_tasks'),
            }),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('env.MONGO_URI'),
                maxPoolSize: 10,
                maxConnecting: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                rejectUnauthorized: false,
            }),
        }),
        TasksModule,
    ],
    controllers: [],
    providers: [],
})
export class TaskServiceModule {}
