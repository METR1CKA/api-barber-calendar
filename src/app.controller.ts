import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('/')
@Controller('/')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public index() {
        return this.appService.index()
    }
}
