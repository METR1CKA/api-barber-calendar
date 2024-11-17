import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import env from 'config/env'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [env],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
