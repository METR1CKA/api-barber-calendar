import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
    public use(req: Request, _res: Response, next: NextFunction) {
        const logger = new Logger('RequestLog')

        logger.log(`Request { ${req.method} - ${req.baseUrl} }`)

        next()
    }
}
