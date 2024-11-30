import {
    ClassSerializerInterceptor,
    Logger,
    ValidationPipe,
} from '@nestjs/common'
import { BadRequestExceptionFilter } from './core/exceptions/bad-request-exception.filter'
import { NotFoundExceptionFilter } from './core/exceptions/not-found-exception.filter'
import { TimeTransformPipe } from './core/pipes/time-transform.pipe'
import { SeederService } from './database/seeders/seeder.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory, Reflector } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import * as yaml from 'js-yaml'
import * as fs from 'fs'

async function bootstrap() {
    // Build App
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug'],
    })

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
        new TimeTransformPipe(),
    )

    app.useGlobalFilters(
        new NotFoundExceptionFilter(),
        new BadRequestExceptionFilter(),
    )

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    )

    // Seeders
    const seeders = app.get(SeederService)
    await seeders.seed()

    // Swagger Documentation
    const document = new DocumentBuilder()
        .setTitle('API BarberShop')
        .setDescription('API for BarberShop management')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer(
            `http://${HOST === '0.0.0.0' ? '127.0.0.1' : HOST}:${PORT}`,
            'Development',
        )
        .setBasePath('api/v1')
        .setOpenAPIVersion('3.0.3')
        .addGlobalParameters({
            in: 'header',
            name: 'Timezone',
            required: false,
        })
        .build()

    const createSwagger = SwaggerModule.createDocument(app, document)

    SwaggerModule.setup('/', app, createSwagger)

    const yamlSchema = yaml.dump(createSwagger)

    const filename = 'swagger.yaml'
    const path = './src/docs'

    if (!fs.existsSync('./src/docs')) {
        fs.mkdirSync('./src/docs')
    }

    if (!fs.existsSync(`${path}/${filename}`)) {
        fs.writeFileSync(`${path}/${filename}`, yamlSchema)
    }

    // Start App
    await app.listen(PORT, HOST)

    // Logger
    const logger = new Logger('Docs for API BarberShop')

    const url = await app.getUrl()

    logger.log(`Swagger running at: ${url}`)
}

bootstrap()
