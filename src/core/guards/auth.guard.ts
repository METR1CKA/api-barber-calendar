import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from 'src/modules/auth/auth.service'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
        private jwtService: JwtService,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        const [type, token] = request.headers.authorization?.split(' ') ?? []

        const tokenJwt = type === 'Bearer' ? token : undefined

        if (!tokenJwt) {
            throw new UnauthorizedException({
                status: 'ERROR',
                message: 'No autorizado',
                data: null,
            })
        }

        try {
            const payload = await this.jwtService.verifyAsync(tokenJwt, {
                secret: this.configService.get<string>('API_JWT_SECRET'),
            })

            const existToken = await this.authService.findToken({
                by: { userId: payload.id, token: tokenJwt },
            })

            if (!existToken) {
                throw new Error('Token no válido')
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                await this.authService.revokeToken({
                    by: {
                        token: tokenJwt,
                    },
                })
            }

            throw new UnauthorizedException({
                status: 'ERROR',
                message: error.message,
                data: null,
            })
        }

        return true
    }
}
