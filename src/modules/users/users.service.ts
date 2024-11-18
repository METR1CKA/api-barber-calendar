import { CreateUserDto } from 'src/dtos/users/create-user.dto'
import { UpdateUserDto } from 'src/dtos/users/update-user.dto'
import { GetUsersDto } from 'src/dtos/users/get-users.dto'
import { HashService } from 'src/common/hash/hash.service'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly hashService: HashService,
    ) {}

    async create({
        createUserDto: { password: user_pass, ...userData },
    }: {
        createUserDto: CreateUserDto
    }) {
        const newUser = this.userRepository.create({
            ...userData,
            password: await this.hashService.hashText({
                plainText: user_pass,
            }),
        })

        const { password, roleId, ...user } =
            await this.userRepository.save(newUser)

        return user
    }

    async findAll({ qs }: { qs: GetUsersDto }) {
        const { page, limit } = qs

        return await this.userRepository.find({
            select: ['id', 'email', 'username', 'name', 'lastname', 'active'],
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
            relations: ['role'],
        })
    }

    async findOne(data: { id?: number; email?: string; active?: boolean }) {
        return await this.userRepository.findOne({
            select: ['id', 'email', 'username', 'name', 'lastname', 'active'],
            where: data,
            relations: ['role'],
        })
    }

    async update({
        user,
        updateUserDto,
    }: {
        user: User
        updateUserDto: UpdateUserDto
    }) {
        const userUpdated = this.userRepository.merge(user, updateUserDto)

        const { password, roleId, ..._user } =
            await this.userRepository.save(userUpdated)

        return _user
    }

    async remove({ user }: { user: User }) {
        const userDeleted = this.userRepository.merge(user, {
            active: !user.active,
        })

        const { password, roleId, ..._user } =
            await this.userRepository.save(userDeleted)

        return _user
    }
}
