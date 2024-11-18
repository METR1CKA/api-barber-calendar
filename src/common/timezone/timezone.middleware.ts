import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { FormatDateTime } from '../luxon/datetime'

@Injectable()
export class TimezoneMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: NextFunction) {
        const timezone = req.headers['timezone']

        if (timezone) {
            const zone = FormatDateTime.isValidZone({
                zone: timezone as string,
            })

            if (!zone.isValid) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: 'ERROR',
                    message: 'Timezone no válido',
                    data: zone,
                })
            }

            FormatDateTime.setLocalZone({ zone: timezone as string })
        }

        next()
    }
}
