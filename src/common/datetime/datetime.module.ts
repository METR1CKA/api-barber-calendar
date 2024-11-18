import { DatetimeService } from './datetime.service'
import { Module } from '@nestjs/common'

@Module({
    providers: [DatetimeService],
    exports: [DatetimeService],
})
export class DatetimeModule {}
