import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { AuthGuard } from 'src/core/guards/auth.guard'
import { GetServiceDto } from './dto/get-service.dto'
import { ServicesService } from './services.service'

@Controller({
    path: 'api/v1/services',
})
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @UseGuards(AuthGuard)
    public async create(@Body() createServiceDto: CreateServiceDto) {
        return await this.servicesService.create({ createServiceDto })
    }

    @Get()
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async findAll(@Query() query: GetServiceDto) {
        return await this.servicesService.findAll({ qs: query })
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.servicesService.findOne({ by: { id } })
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateServiceDto: UpdateServiceDto,
    ) {
        return await this.servicesService.update({
            id,
            updateServiceDto,
        })
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.servicesService.remove({ id })
    }
}
