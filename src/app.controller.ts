import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@ApiTags('/')
@Controller('/')
export class AppController {
    @Get()
    @ApiOkResponse({
        description: 'Route index for API barbershop',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                        },
                        message: {
                            type: 'string',
                        },
                        data: {
                            default: null,
                        },
                    },
                },
            },
        },
    })
    public index(@Res() response: Response): Response {
        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Bienvenido a la API Barbershop V1',
            data: null,
        })
    }
}
