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
import { FormatDateTime } from 'src/common/luxon/datetime'
import { AuthGuard } from 'src/common/auth/auth.guard'
import { UsersService } from '../users/users.service'
import { LoginDto } from 'src/dtos/auth/login.dto'
import { Hash } from 'src/common/bcrypt/hash'
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

        const token = await this.authService.generateToken({
            payload: {
                id: user.id,
                email: user.email,
                role: user.role.name,
            },
        })

        const { iat, exp } = await this.authService.validateToken({ token })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Inicio de sesión exitoso',
            data: {
                token,
                issuedAt: FormatDateTime.getConvertedTimestampToDateTime({
                    timestamp: iat,
                }),
                expiresAt: FormatDateTime.getConvertedTimestampToDateTime({
                    timestamp: exp,
                }),
            },
        })
    }

    @Post('logout')
    public async logout(@Res() response: Response) {}

    @Get('me')
    @UseGuards(AuthGuard)
    public async me(@Req() request: Request, @Res() response: Response) {
        const user = await this.userService.findOne({
            by: {
                email: request['payload'].email,
            },
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'Perfil de usuario',
            data: user,
        })
    }
}
