import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUsersDto } from './dto/get-users.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

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
            password: await bcrypt.hash(user_pass, 10),
        })

        const { password, role_id, ...user } =
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

        const { password, role_id, ..._user } =
            await this.userRepository.save(userUpdated)

        return _user
    }

    public async remove({ user }: { user: User }) {
        const userDeleted = this.userRepository.merge(user, {
            active: !user.active,
        })

        const { password, role_id, ..._user } =
            await this.userRepository.save(userDeleted)

        return _user
    }
}
