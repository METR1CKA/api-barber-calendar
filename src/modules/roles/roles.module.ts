import { Role } from '../roles/entities/role.entity'
import { RolesController } from './roles.controller'
import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesService } from './roles.service'

@Module({
    imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => AuthModule)],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule {}
