import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './modules/users/users.module'
import { RolesModule } from './modules/roles/roles.module'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Module } from '@nestjs/common'
import env from 'config/env'
import { Role } from './entities/role.entity'

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
                entities: [User, Role],
                synchronize: configService.get<boolean>('env.SYNC_DB'),
            }),
        }),
        UsersModule,
        RolesModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
