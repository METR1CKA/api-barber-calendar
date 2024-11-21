import { ServicesController } from './services.controller'
import { ServicesService } from './services.service'
import { forwardRef, Module } from '@nestjs/common'
import { Service } from './entities/service.entity'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forFeature([Service]),
        forwardRef(() => AuthModule),
    ],
    controllers: [ServicesController],
    providers: [ServicesService],
    exports: [ServicesService],
})
export class ServicesModule {}
