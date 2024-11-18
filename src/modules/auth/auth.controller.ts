import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { HashService } from 'src/common/hash/hash.service'
import { UsersService } from '../users/users.service'
import { LoginDto } from 'src/dtos/auth/login.dto'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly hashService: HashService,
    ) {}

    @Post('login')
    async login(
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
                message: 'Invalid credentials',
                data: null,
            })
        }

        const passwordMatch = await this.hashService.compareHash({
            plainText: loginDto.password,
            hashText: user.password,
        })

        if (!passwordMatch) {
            return response.status(HttpStatus.UNAUTHORIZED).json({
                status: 'ERROR',
                message: 'Invalid credentials',
                data: null,
            })
        }

        const token = await this.authService.generateToken({
            payload: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role.name,
            },
        })

        return response.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'User logged in',
            data: {
                token,
            },
        })
    }

    @Post('logout')
    async logout(@Res() response: Response) {}

    @Get('me')
    async me(@Res() response: Response) {}
}
