import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { schema } from '../config/services'
import { Module } from '@nestjs/common'
import env from '../config/env'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/api-gateway/.env',
            load: [env],
            validationSchema: schema,
        }),
        UsersModule,
        TasksModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
