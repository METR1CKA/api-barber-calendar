import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { DatetimeService } from '../datetime/datetime.service'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class TimezoneMiddleware implements NestMiddleware {
    constructor(private readonly datetimeService: DatetimeService) {}

    public use(req: Request, res: Response, next: NextFunction) {
        const timezone = req.headers['timezone']

        if (timezone) {
            const zone = this.datetimeService.isValidZone({
                zone: timezone as string,
            })

            if (!zone.isValid) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: 'ERROR',
                    message: 'Timezone no válido',
                    data: zone,
                })
            }

            this.datetimeService.setLocalZone({ zone: timezone as string })
        }

        next()
    }
}
