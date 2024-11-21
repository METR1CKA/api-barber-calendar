import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { ServicesService } from './services.service'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    create(@Body() createServiceDto: CreateServiceDto) {}

    @Get()
    findAll() {}

    @Get(':id')
    findOne(@Param('id') id: string) {}

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateServiceDto: UpdateServiceDto,
    ) {}

    @Delete(':id')
    remove(@Param('id') id: string) {}
}
