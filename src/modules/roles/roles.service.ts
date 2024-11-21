import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role, ROLES } from './entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { GetRoleDto } from './dto/get-roles.dto'
import { Repository } from 'typeorm'

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    public async create({ createRoleDto }: { createRoleDto: CreateRoleDto }) {
        const role = this.roleRepository.create(createRoleDto)

        const newRole = await this.roleRepository.save(role)

        return {
            status: 'OK',
            message: 'Rol creado',
            data: newRole,
        }
    }

    public async findAll({ qs }: { qs: GetRoleDto }) {
        const { page, limit } = qs

        const roles = await this.roleRepository.find({
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
        })

        return {
            status: 'OK',
            message: 'Roles obtenidos correctamente',
            data: roles,
        }
    }

    public async findOne({ by }: { by: { id?: number; name?: ROLES } }) {
        const role = await this.roleRepository.findOne({ where: by })

        if (!role) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Rol no encontrado',
                data: null,
            })
        }

        return {
            status: 'OK',
            message: 'Rol encontrado',
            data: role,
        }
    }

    public async update({
        id,
        updateRoleDto,
    }: {
        id: number
        updateRoleDto: UpdateRoleDto
    }) {
        const role = await this.roleRepository.findOne({ where: { id } })

        if (!role) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Rol no encontrado',
                data: null,
            })
        }

        const roleUpdated = this.roleRepository.merge(role, updateRoleDto)

        const updatedRole = await this.roleRepository.save(roleUpdated)

        return {
            status: 'OK',
            message: 'Rol actualizado',
            data: updatedRole,
        }
    }

    public async remove({ id }: { id: number }) {
        const role = await this.roleRepository.findOne({ where: { id } })

        if (!role) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Rol no encontrado',
                data: null,
            })
        }

        const roleDeleted = this.roleRepository.merge(role, {
            active: !role.active,
        })

        const deletedRole = await this.roleRepository.save(roleDeleted)

        return {
            status: 'OK',
            message: 'Rol activado/desactivado',
            data: deletedRole,
        }
    }
}
