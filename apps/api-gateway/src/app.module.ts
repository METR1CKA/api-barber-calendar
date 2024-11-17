import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { schema } from '../config/service'
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
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
