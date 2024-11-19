import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common'
import { LoginDto } from 'src/modules/auth/dto/login.dto'
import { AuthGuard } from 'src/core/guards/auth.guard'
import { UsersService } from '../users/users.service'
import { Hash } from 'src/shared/utils/bcrypt-hash'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {}

    @Post('login')
    public async login(
        @Body() loginDto: LoginDto,
        @Res() response: Response,
    ): Promise<Response> {
        const user = await this.userService.findOne({
            by: {
                email: loginDto.email,
            },
            options: { includePassword: true },
        })

        if (!user) {
            return response.status(HttpStatus.UNAUTHORIZED).json({
                status: 'ERROR',
                message: 'Credenciales incorrectas',
                data: null,
            })
        }

        const passwordMatch = await Hash.compareHash({
            plainText: loginDto.password,
            hashText: user.password,
        })

        if (!passwordMatch) {
            return response.status(HttpStatus.UNAUTHORIZED).json({
                status: 'ERROR',
                message: 'Credenciales incorrectas',
                data: null,
            })
        }

        const tokenJwt = await this.authService.generateToken({
            payload: {
                id: user.id,
                email: user.email,
                role: user.role.name,
            },
        })

        const authJwt = await this.authService.saveToken({
            tokenString: tokenJwt,
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Inicio de sesión exitoso',
            data: authJwt,
        })
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    public async logout(@Req() request: Request, @Res() response: Response) {
        const tokenString = request.headers.authorization?.replace(
            'Bearer ',
            '',
        )

        const payload = await this.authService.decodeToken({
            token: tokenString,
        })

        await this.authService.revokeToken({
            by: {
                userId: payload.id,
                token: tokenString,
            },
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Cierre de sesión exitoso',
            data: null,
        })
    }

    @Get('me')
    @UseGuards(AuthGuard)
    public async me(@Req() request: Request, @Res() response: Response) {
        const tokenString = request.headers.authorization?.replace(
            'Bearer ',
            '',
        )

        const payload = await this.authService.decodeToken({
            token: tokenString,
        })

        const user = await this.userService.findOne({
            by: {
                email: payload.email,
                id: payload.id,
            },
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Perfil de usuario',
            data: user,
        })
    }
}
