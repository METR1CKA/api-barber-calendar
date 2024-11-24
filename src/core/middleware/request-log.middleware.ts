import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
    public use(req: Request, _res: Response, next: NextFunction) {
        const logger = new Logger('RequestLog')

        const url = req.baseUrl === '' ? req.path : req.baseUrl

        logger.log(`Request { ${req.method} - ${url} }`)

        next()
    }
}
