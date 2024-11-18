import { CreateUserDto } from 'src/modules/users/dto/create-user.dto'
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto'
import { GetUsersDto } from 'src/modules/users/dto/get-users.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Hash } from 'src/shared/utils/bcrypt-hash'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    private fields: (keyof User)[]

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        this.fields = ['id', 'email', 'username', 'name', 'lastname', 'active']
    }

    public async create({
        createUserDto: { password: user_pass, ...userData },
    }: {
        createUserDto: CreateUserDto
    }) {
        const newUser = this.userRepository.create({
            ...userData,
            password: await Hash.hashText({
                plainText: user_pass,
            }),
        })

        const { password, roleId, ...user } =
            await this.userRepository.save(newUser)

        return user
    }

    public async findAll({ qs }: { qs: GetUsersDto }) {
        const { page, limit } = qs

        return await this.userRepository.find({
            select: this.fields,
            skip: limit * (page - 1),
            take: limit,
            order: { id: 'DESC' },
            relations: ['role'],
        })
    }

    public async findOne({
        by = {},
        relations = ['role'],
        options = { includePassword: false },
    }: {
        by?: { id?: number; email?: string; active?: boolean }
        relations?: string[]
        options?: { includePassword?: boolean }
    }) {
        if (!Object.keys(by).length) {
            return null
        }

        const fields = this.fields.slice()

        if (options.includePassword) {
            fields.push('password')
        }

        return await this.userRepository.findOne({
            select: fields,
            where: by,
            relations,
        })
    }

    public async update({
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

    public async remove({ user }: { user: User }) {
        const userDeleted = this.userRepository.merge(user, {
            active: !user.active,
        })

        const { password, roleId, ..._user } =
            await this.userRepository.save(userDeleted)

        return _user
    }
}
