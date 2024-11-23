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
    HttpCode,
    HttpStatus,
} from '@nestjs/common'
import { AuthJwtGuard } from 'src/core/guards/auth-jwt.guard'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { GetServiceDto } from './dto/get-service.dto'
import { ServicesService } from './services.service'

@Controller({
    path: 'api/v1/services',
})
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createServiceDto: CreateServiceDto) {
        return await this.servicesService.create({ createServiceDto })
    }

    @Get()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    public async findAll(@Query() query: GetServiceDto) {
        return await this.servicesService.findAll({ qs: query })
    }

    @Get(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.servicesService.findOne({ by: { id } })
    }

    @Patch(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
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
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.servicesService.remove({ id })
    }
}
