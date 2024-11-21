import { FormatDateTime } from '../../shared/utils/luxon-datetime'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ApiJwtToken } from './entities/api-jwt-token.entity'
import { PayloadJWT } from '../../shared/types/jwt.type'
import { User } from '../users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    private type: string

    constructor(
        @InjectRepository(ApiJwtToken)
        private readonly apiJwtTokenRepository: Repository<ApiJwtToken>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
        this.type = 'Bearer'
    }

    public async login({ loginDto }: { loginDto: LoginDto }) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
            relations: ['role'],
        })

        if (!user) {
            throw new UnauthorizedException({
                status: 'ERROR',
                message: 'Credenciales incorrectas',
                data: null,
            })
        }

        const passwordMatch = await bcrypt.compare(
            loginDto.password,
            user.password,
        )

        if (!passwordMatch) {
            throw new UnauthorizedException({
                status: 'ERROR',
                message: 'Credenciales incorrectas',
                data: null,
            })
        }

        const tokenJwt = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role.name,
        })

        const { sub, iat, exp }: PayloadJWT = this.jwtService.decode(tokenJwt)

        const existToken = await this.findToken({ by: { user_id: sub } })

        if (existToken) {
            await this.apiJwtTokenRepository.delete({
                id: existToken.id,
                user_id: sub,
                token: tokenJwt,
            })
        }

        const tokenRepo = this.apiJwtTokenRepository.create({
            token: tokenJwt,
            user_id: sub,
            type: this.type,
            ...FormatDateTime.jwtTimestamp({ iat, exp }),
        })

        await this.apiJwtTokenRepository.save(tokenRepo)

        return {
            status: 'OK',
            message: 'Inicio de sesión exitoso',
            data: {
                token: tokenJwt,
                ...FormatDateTime.jwtTimestamp({ iat, exp, toFormat: true }),
            },
        }
    }

    public async logout({ request }: { request: Request }) {
        const payload = request['user'] as PayloadJWT

        await this.apiJwtTokenRepository.delete({
            user_id: payload.sub,
        })

        return {
            status: 'OK',
            message: 'Cierre de sesión exitoso',
            data: null,
        }
    }

    public async me({ request }: { request: Request }) {
        const payload = request['user'] as PayloadJWT

        const user = await this.userRepository.findOne({
            where: {
                email: payload.email,
                id: payload.sub,
            },
            relations: ['role'],
        })

        return {
            status: 'OK',
            message: 'Perfil de usuario',
            data: user,
        }
    }

    public async findToken({
        by,
    }: {
        by: { user_id?: number; token?: string }
    }): Promise<ApiJwtToken | null> {
        return await this.apiJwtTokenRepository.findOne({
            where: by,
        })
    }

    public async revokeToken({
        by,
    }: {
        by: {
            id?: number
            user_id?: number
            token?: string
        }
    }): Promise<DeleteResult> {
        return await this.apiJwtTokenRepository.delete(by)
    }
}
