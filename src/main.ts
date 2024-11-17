import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
    const logger = new Logger('API Barber')

    const app = await NestFactory.create(AppModule)

    const configService = app.get(ConfigService)

    const HOST = configService.get<string>('HOST')
    const PORT = configService.get<number>('PORT')

    await app.listen(PORT, HOST, () => {
        logger.log(`Server running at: ${HOST}:${PORT}`)
    })
}

bootstrap()
