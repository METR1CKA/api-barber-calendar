import { RpcExceptionFilterRes } from '../exceptions/rpc-exception-res.filter'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const logger = new Logger('ApiGateway')

    const app = await NestFactory.create(AppModule)

    const config_service = app.get(ConfigService)

    const HOST = config_service.get<string>('env.HOST')
    const PORT = config_service.get<number>('env.PORT')

    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )

    app.useGlobalFilters(new RpcExceptionFilterRes())

    app.setGlobalPrefix('api/v1')

    await app.listen(PORT, HOST, () => {
        logger.log(`Server ApiGateway is running on host: ${HOST}:${PORT}`)
    })
}

bootstrap()
