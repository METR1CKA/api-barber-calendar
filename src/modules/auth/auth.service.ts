import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

type PayloadJWT = {
    id: number
    email: string
    role: string
}

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    public async generateToken({
        payload,
    }: {
        payload: PayloadJWT
    }): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }

    public async validateToken({
        token,
    }: {
        token: string
    }): Promise<Record<string, any>> {
        return await this.jwtService.verifyAsync(token)
    }

    public check({ token }: { token: string }) {
        return this.jwtService.decode(token)
    }
}
