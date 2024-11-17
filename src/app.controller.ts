import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('/')
export class AppController {
    @Get()
    index(@Res() response: Response): Response<any, Record<string, string>> {
        return response.status(HttpStatus.OK).json({
            message: 'Welcome to the API Barbershop V1',
        })
    }
}
