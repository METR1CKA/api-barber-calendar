import { TimezoneMiddleware } from './core/middleware/timezone.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { SeederModule } from './database/seeders/seeder.module'
import { dataSourceOptions } from './config/data-source.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './modules/users/users.module'
import { RolesModule } from './modules/roles/roles.module'
import { AuthModule } from './modules/auth/auth.module'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import env from './config/env.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            envFilePath: '.env',
            isGlobal: true,
            load: [env],
        }),
        TypeOrmModule.forRoot(dataSourceOptions),
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
        SeederModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(TimezoneMiddleware).forRoutes('*')
    }
}
