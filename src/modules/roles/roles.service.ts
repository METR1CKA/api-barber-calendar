import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { GetRoleDto } from './dto/get-roles.dto'
import { Role, ROLES } from './entities/role.entity'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    public async create({ createRoleDto }: { createRoleDto: CreateRoleDto }) {
        const newRole = this.roleRepository.create(createRoleDto)

        return await this.roleRepository.save(newRole)
    }

    public async findAll({ qs }: { qs: GetRoleDto }) {
        const { page, limit } = qs

        return await this.roleRepository.find({
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
        })
    }

    public async findOne({ by }: { by: { id?: number; name?: ROLES } }) {
        return await this.roleRepository.findOne({ where: by })
    }

    public async update({
        role,
        updateRoleDto,
    }: {
        role: Role
        updateRoleDto: UpdateRoleDto
    }) {
        const roleUpdated = this.roleRepository.merge(role, updateRoleDto)
        return await this.roleRepository.save(roleUpdated)
    }

    public async remove({ role }: { role: Role }) {
        const roleDeleted = this.roleRepository.merge(role, {
            active: !role.active,
        })

        return await this.roleRepository.save(roleDeleted)
    }
}
