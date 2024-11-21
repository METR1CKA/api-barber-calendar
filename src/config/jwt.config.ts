import { JwtModuleOptions } from '@nestjs/jwt'
import { Env } from './env.config'

export const jwtConfig: JwtModuleOptions = {
    secret: Env.API_JWT_SECRET,
    signOptions: { expiresIn: '1d' },
    global: true,
}
