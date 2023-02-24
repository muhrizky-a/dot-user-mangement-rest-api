import { Controller, Request, Post, UseGuards, Get, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req, @Res() res: Response) {
        const data = await this.authService.login(req.user);

        res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            accessToken: data.access_token
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}