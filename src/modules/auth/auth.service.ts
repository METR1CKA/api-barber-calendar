import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

type PayloadJWT = {
    id: number
    email: string
    username: string
    role: string
}

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async generateToken({ payload }: { payload: PayloadJWT }) {
        return await this.jwtService.signAsync(payload)
    }
}
