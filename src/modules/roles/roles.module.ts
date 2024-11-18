import { Role } from 'src/modules/roles/entities/role.entity'
import { RolesController } from './roles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesService } from './roles.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule {}
