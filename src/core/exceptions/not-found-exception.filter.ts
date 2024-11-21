import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
    HttpStatus,
} from '@nestjs/common'
import { Response, Request } from 'express'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(_exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        if (_exception.message === `Cannot GET ${request.url}`) {
            return response.status(HttpStatus.NOT_FOUND).json({
                status: 'ERROR',
                message: 'La ruta solicitada no existe.',
                data: null,
            })
        }

        response.status(_exception.getStatus()).json(_exception.getResponse())
    }
}
