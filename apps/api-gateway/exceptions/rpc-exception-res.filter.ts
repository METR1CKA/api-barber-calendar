import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

@Catch(RpcException)
export class RpcExceptionFilterRes implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        const rpcError = exception.getError()

        if (
            typeof rpcError === 'object' &&
            'status' in rpcError &&
            'message' in rpcError
        ) {
            const status = isNaN(Number(rpcError.status))
                ? 500
                : Number(rpcError.status)

            return response.status(status).json({
                message: rpcError.message,
            })
        }

        return response.status(500).json(rpcError)
    }
}
