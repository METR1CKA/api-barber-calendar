import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
} from '@nestjs/common'
import { ApiResponseType } from '../../shared/types/api-response.type'
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
    public async login(
        @Body() loginDto: LoginDto,
    ): Promise<ApiResponseType<TokenJWT>> {
        return await this.authService.login({ loginDto })
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    public async logout(@Req() request: Request) {
        return await this.authService.logout({ request })
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    public async me(@Req() request: Request) {
        return await this.authService.me({ request })
    }
}
