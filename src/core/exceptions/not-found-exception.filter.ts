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
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()

        const response = ctx.getResponse<Response>()

        const request = ctx.getRequest<Request>()

        const exceptionResponse: any = exception.getResponse()

        const statusCode = exception.getStatus()

        if (
            exceptionResponse &&
            'statusCode' in exceptionResponse &&
            'message' in exceptionResponse &&
            'error' in exceptionResponse
        ) {
            return response.status(statusCode).json({
                status: 'ERROR',
                message: 'La ruta solicitada no existe.',
                data: {
                    method: request.method,
                    url: request.url,
                },
            })
        }

        return response.status(statusCode).json(exceptionResponse)
    }
}
