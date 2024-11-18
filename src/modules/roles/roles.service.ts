import { CreateRoleDto } from '../../dtos/roles/create-role.dto'
import { UpdateRoleDto } from '../../dtos/roles/update-role.dto'
import { GetRoleDto } from 'src/dtos/roles/get-roles.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from 'src/entities/role.entity'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    async create({ createRoleDto }: { createRoleDto: CreateRoleDto }) {
        const newRole = this.roleRepository.create(createRoleDto)

        return await this.roleRepository.save(newRole)
    }

    async findAll({ qs }: { qs: GetRoleDto }) {
        const { page, limit } = qs

        return await this.roleRepository.find({
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
        })
    }

    async findOne(data: { id?: number; name?: string }) {
        return await this.roleRepository.findOne({ where: data })
    }

    async update({
        role,
        updateRoleDto,
    }: {
        role: Role
        updateRoleDto: UpdateRoleDto
    }) {
        const roleUpdated = this.roleRepository.merge(role, updateRoleDto)
        return await this.roleRepository.save(roleUpdated)
    }

    async remove({ role }: { role: Role }) {
        const roleDeleted = this.roleRepository.merge(role, {
            active: !role.active,
        })

        return await this.roleRepository.save(roleDeleted)
    }
}
