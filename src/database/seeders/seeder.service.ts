import { ServicesService } from './services/services.service'
import { UserService } from './users/user.service'
import { RoleService } from './roles/role.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SeederService {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly servicesService: ServicesService,
    ) {}

    async seed() {
        await this.roleService.seed()
        await this.userService.seed()
        await this.servicesService.seed()
    }
}
