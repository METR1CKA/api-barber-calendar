import { FormatDateTime } from 'src/shared/utils/luxon-datetime'
import { PayloadJWT } from 'src/shared/types/jwt-payload.type'
import { ApiJwtToken } from './entities/api-jwt-token.entity'
import { Hash } from 'src/shared/utils/bcrypt-hash'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'

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
        by: { userId: number; token?: string }
    }): Promise<ApiJwtToken> {
        return await this.apiJwtTokenRepository.findOne({
            where: by,
        })
    }

    public async generateToken({
        payload,
    }: {
        payload: PayloadJWT
    }): Promise<any> {
        const existToken = await this.findToken({ by: { userId: payload.id } })

        if (existToken) {
            await this.apiJwtTokenRepository.delete(existToken.id)
        }

        const tokenString = await this.jwtService.signAsync(payload)

        const { iat, exp }: { iat: number; exp: number } =
            this.jwtService.decode(tokenString)

        const tokenRepo = this.apiJwtTokenRepository.create({
            token: tokenString,
            userId: payload.id,
            type: this.type,
            ...FormatDateTime.jwtTimestamp({ iat, exp }),
        })

        await this.apiJwtTokenRepository.save(tokenRepo)

        return {
            token: tokenString,
            ...FormatDateTime.jwtTimestamp({ iat, exp, toFormat: true }),
        }
    }

    public decodeToken({ token }: { token: string }) {
        return this.jwtService.decode(token)
    }
}
