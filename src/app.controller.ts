import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@ApiTags('/')
@Controller('/')
export class AppController {
    @Get()
    public index(@Res() response: Response): Response {
        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Bienvenido a la API Barbershop V1',
            data: null,
        })
    }
}
