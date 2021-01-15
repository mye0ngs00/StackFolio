import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly usersService: UsersService){}

    @Get()
    getAuth(){
        return { message: "auth"};
    }

    @Post("register")
    register(@Body() userData: CreateUserDto) {
        return this.authService.register(userData);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
    
    @UseGuards(AuthGuard("local"))
    @Post("local")
    async login(@Req() req) {
        return this.authService.login(req.user);
    }
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req);
    }
}
