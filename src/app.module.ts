import { TimezoneMiddleware } from './common/timezone/timezone.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './modules/users/users.module'
import { RolesModule } from './modules/roles/roles.module'
import { AuthModule } from './modules/auth/auth.module'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Role } from './entities/role.entity'
import { JwtModule } from '@nestjs/jwt'
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
                entities: [User, Role],
                synchronize: configService.get<boolean>('env.SYNC_DB'),
            }),
        }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('API_JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
                global: true,
            }),
        }),
        UsersModule,
        RolesModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(TimezoneMiddleware).forRoutes('*')
    }
}
