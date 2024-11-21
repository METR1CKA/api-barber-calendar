import { NotFoundExceptionFilter } from './core/exceptions/not-found-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SeederService } from './database/seeders/seeder.service'

async function bootstrap() {
    // Build App
    const app = await NestFactory.create(AppModule)

    const configService = app.get(ConfigService)

    const HOST = configService.get<string>('HOST')
    const PORT = configService.get<number>('PORT')

    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    )

    app.useGlobalFilters(new NotFoundExceptionFilter())

    // Seeders
    const seeders = app.get(SeederService)
    await seeders.seed()

    // Swagger
    const document = new DocumentBuilder()
        .setTitle('API BarberShop')
        .setDescription('API for BarberShop management')
        .setVersion('1.0')
        .addServer(`http://${HOST}:${PORT}`, 'Development')
        .build()

    SwaggerModule.setup(
        'api/docs',
        app,
        SwaggerModule.createDocument(app, document),
    )

    await app.listen(PORT, HOST)

    // Logger
    const logger = new Logger('API Barber')
    const loggerSwagger = new Logger('Swagger')

    const url = await app.getUrl()

    logger.log(`Server running at: ${url}`)
    loggerSwagger.log(`Swagger running at: ${url}/api/docs`)
}

bootstrap()
