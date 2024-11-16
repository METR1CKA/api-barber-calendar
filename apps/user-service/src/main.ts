import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { UserServiceModule } from './user-service.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
    const logger = new Logger('User Service')

    const HOST = process.env.USER_SERVICE_HOST ?? 'localhost'
    const PORT = process.env.USER_SERVICE_PORT
        ? parseInt(process.env.USER_SERVICE_PORT)
        : 3001

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        UserServiceModule,
        {
            transport: Transport.TCP,
            options: {
                host: HOST,
                port: PORT,
            },
        },
    )

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )

    await app.listen()

    logger.log(`User Service is running on: ${HOST}:${PORT}`)
}

bootstrap()
