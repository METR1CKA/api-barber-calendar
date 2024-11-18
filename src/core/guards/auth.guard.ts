import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
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
            request['payload'] = await this.jwtService.verifyAsync(tokenJwt, {
                secret: this.configService.get<string>('API_JWT_SECRET'),
            })
        } catch {
            throw new UnauthorizedException({
                status: 'ERROR',
                message: 'No autorizado',
                data: null,
            })
        }

        return true
    }
}
