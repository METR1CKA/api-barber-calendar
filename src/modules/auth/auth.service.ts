import { FormatDateTime } from 'src/shared/utils/luxon-datetime'
import { ApiJwtToken } from './entities/api-jwt-token.entity'
import { PayloadJWT, TokenJWT } from 'src/shared/types/jwt.type'
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
        const { id, iat, exp }: { id: number; iat: number; exp: number } =
            this.jwtService.decode(tokenString)

        const existToken = await this.findToken({ by: { userId: id } })

        if (existToken) {
            await this.revokeToken({
                by: { id: existToken.id, userId: id, token: tokenString },
            })
        }

        const tokenRepo = this.apiJwtTokenRepository.create({
            token: tokenString,
            userId: id,
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
