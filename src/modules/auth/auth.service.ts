import { FormatDateTime } from '../../shared/utils/luxon-datetime'
import { PayloadJWT, TokenJWT } from '../../shared/types/jwt.type'
import { ApiJwtToken } from './entities/api-jwt-token.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    private type: string

    constructor(
        @InjectRepository(ApiJwtToken)
        private readonly apiJwtTokenRepository: Repository<ApiJwtToken>,
        private readonly jwtService: JwtService,
    ) {
        this.type = 'Bearer'
    }

    public async decodeToken({
        token,
    }: {
        token: string
    }): Promise<PayloadJWT> {
        return await this.jwtService.decode(token)
    }

    public async findToken({
        by,
    }: {
        by: { userId?: number; token?: string }
    }): Promise<ApiJwtToken | null> {
        return await this.apiJwtTokenRepository.findOne({
            where: by,
        })
    }

    public async generateToken({
        payload,
    }: {
        payload: PayloadJWT
    }): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }

    public async revokeToken({
        by,
    }: {
        by: {
            id?: number
            userId?: number
            token?: string
        }
    }): Promise<DeleteResult> {
        return await this.apiJwtTokenRepository.delete(by)
    }

    public async saveToken({
        tokenString,
    }: {
        tokenString: string
    }): Promise<TokenJWT> {
        const { sub, iat, exp }: PayloadJWT =
            this.jwtService.decode(tokenString)

        const existToken = await this.findToken({ by: { userId: sub } })

        if (existToken) {
            await this.revokeToken({
                by: { id: existToken.id, userId: sub, token: tokenString },
            })
        }

        const tokenRepo = this.apiJwtTokenRepository.create({
            token: tokenString,
            user_id: sub,
            type: this.type,
            ...FormatDateTime.jwtTimestamp({ iat, exp }),
        })

        await this.apiJwtTokenRepository.save(tokenRepo)

        return {
            token: tokenString,
            ...FormatDateTime.jwtTimestamp({ iat, exp, toFormat: true }),
        }
    }
}
