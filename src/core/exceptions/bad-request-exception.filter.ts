import {
    BadRequestException,
    ExceptionFilter,
    ArgumentsHost,
    Catch,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()

        const response = ctx.getResponse<Response>()

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
                message: 'Error de validación de datos',
                data: exceptionResponse?.message,
            })
        }

        return response.status(statusCode).json(exceptionResponse)
    }
}
