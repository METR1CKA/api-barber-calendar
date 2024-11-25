import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { ApiResponseType } from '../../shared/types/api-response.type'
import { AuthJwtGuard } from 'src/core/guards/auth-jwt.guard'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { TokenJWT } from '../../shared/types/jwt.type'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Request } from 'express'

@Controller({
    path: 'api/auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Inicio de sesión exitoso',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Credenciales incorrectas',
    })
    public async login(
        @Body() loginDto: LoginDto,
    ): Promise<ApiResponseType<TokenJWT>> {
        return await this.authService.login({ loginDto })
    }

    @Post('logout')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Cierre de sesión exitoso',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async logout(@Req() request: Request) {
        return await this.authService.logout({ request })
    }

    @Get('me')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, description: 'Perfil de usuario' })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'No autorizado',
    })
    public async me(@Req() request: Request) {
        return await this.authService.me({ request })
    }
}
