import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { TaskServiceModule } from './task-service.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
    const logger = new Logger('Task Service')

    const HOST = process.env.TASK_SERVICE_HOST ?? 'localhost'
    const PORT = process.env.TASK_SERVICE_PORT
        ? parseInt(process.env.TASK_SERVICE_PORT)
        : 3002

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        TaskServiceModule,
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
