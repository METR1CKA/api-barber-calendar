import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RolesService } from '../roles/roles.service'
import { InjectRepository } from '@nestjs/typeorm'
import { GetUsersDto } from './dto/get-users.dto'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly rolesService: RolesService,
    ) {}

    public async create({
        createUserDto: { password: user_pass, ...userData },
    }: {
        createUserDto: CreateUserDto
    }) {
        const userExists = await this.userRepository.findOne({
            where: { email: userData.email },
        })

        if (userExists) {
            throw new BadRequestException({
                status: 'ERROR',
                message: 'Ya existe un usuario con este correo',
                data: null,
            })
        }

        const role = await this.rolesService.findOne({
            by: { id: userData.role_id },
        })

        if (!role) {
            throw new BadRequestException({
                status: 'ERROR',
                message: 'El rol no existe',
                data: null,
            })
        }

        const newUser = this.userRepository.create({
            ...userData,
            password: await bcrypt.hash(user_pass, 10),
        })

        const userNew = await this.userRepository.save(newUser)

        return {
            status: 'OK',
            message: 'Usuario creado',
            data: userNew,
        }
    }

    public async findAll({ qs }: { qs: GetUsersDto }) {
        const { page, limit } = qs

        const users = await this.userRepository.find({
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
            relations: ['role'],
        })

        return {
            status: 'OK',
            message: 'Usuarios obtenidos correctamente',
            data: users,
        }
    }

    public async findOne({
        by = {},
    }: {
        by: { id?: number; email?: string; active?: boolean }
    }) {
        const user = await this.userRepository.findOne({
            relations: ['role'],
            where: by,
        })

        if (!user) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Usuario no encontrado',
                data: null,
            })
        }

        return {
            status: 'OK',
            message: 'Usuario encontrado',
            data: user,
        }
    }

    public async update({
        id,
        updateUserDto,
    }: {
        id: number
        updateUserDto: UpdateUserDto
    }) {
        const user = await this.userRepository.findOne({
            where: { id },
        })

        if (!user) {
            throw new NotFoundException({
                status: 'ERROR',
                message: 'Usuario no encontrado',
                data: null,
            })
        }

        if (updateUserDto.role_id) {
            const role = await this.rolesService.findOne({
                by: { id: updateUserDto.role_id },
            })

            if (!role) {
                throw new BadRequestException({
                    status: 'ERROR',
                    message: 'El rol no existe',
                    data: null,
                })
            }
        }

        const userUpdated = this.userRepository.merge(user, updateUserDto)

        const updatedUser = await this.userRepository.save(userUpdated)

        return {
            status: 'OK',
            message: 'Usuario actualizado',
            data: updatedUser,
        }
    }

    public async remove({ id }: { id: number }) {
        const user = await this.userRepository.findOne({
            where: { id },
        })

        if (user) {
            const userDeleted = this.userRepository.merge(user, {
                active: !user.active,
            })

            await this.userRepository.save(userDeleted)
        }

        return {
            status: 'OK',
            message: 'Usuario activado/desactivado',
            data: null,
        }
    }
}
