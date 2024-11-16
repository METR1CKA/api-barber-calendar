import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { GetUsersDto } from './dto/get-users.dto'
import { User } from './entities/user.entity'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async create({ createUserDto }: { createUserDto: CreateUserDto }) {
        const newUser = this.userRepository.create(createUserDto)
        return await this.userRepository.save(newUser)
    }

    async findAll({ qs }: { qs: GetUsersDto }) {
        const { page, limit } = qs

        return await this.userRepository.find({
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
            // where: { active: true },
        })
    }

    async findOne(data: {
        id?: number
        email?: string
        // active?: boolean
    }) {
        return await this.userRepository.findOne({ where: data })
    }

    async update({
        user,
        updateUserDto,
    }: {
        user: User
        updateUserDto: UpdateUserDto
    }) {
        const userUpdated = this.userRepository.merge(user, updateUserDto)
        return await this.userRepository.save(userUpdated)
    }

    async remove({ user }: { user: User }) {
        /* const userDeleted = this.userRepository.merge(user, {
            active: !user.active,
        })
        return await this.userRepository.save(userDeleted) */

        return await this.userRepository.delete(user)
    }
}
