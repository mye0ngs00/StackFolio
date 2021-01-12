import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    // @Post("signup")
    // public async signUp(@Body(new ValidationPipe()) user: CreateUserDto) {
    //     return await this.authService.validateUser(user);
    // }

    @UseGuards(AuthGuard("local"))
    @Post("local/login")
    async login(@Req() req){
        return this.authService.login(req.user);
        // return await this.authService.createToken(req.user);
    }

    @Get("google/login")
    @UseGuards(AuthGuard("google"))
    async googleAuth(@Req() req){}

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    googleAuthRedirect(@Req() req){
        return this.authService.googleLogin(req);
    }
    
}
