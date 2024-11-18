import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
    HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(_exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        response.status(HttpStatus.NOT_FOUND).json({
            status: 'ERROR',
            message: 'La ruta solicitada no existe.',
            data: null,
        })
    }
}
