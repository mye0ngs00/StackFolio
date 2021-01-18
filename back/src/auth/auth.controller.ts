import { Body, Controller, Get, Header, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { from } from 'rxjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import {Response} from "express";

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
        // Bearer Toekn에 삽입?
    }
    
    // @Header("access_token", "")
    @UseGuards(AuthGuard("local"))
    @Post("local")
    async login(@Req() req, @Res({passthrough: true}) res: Response) {
        const user = this.authService.login(req.user)
        res.setHeader("access_token",user.access_token);
        // console.log(res);
        // req.headers["test"] = user.access_token;
        return user;
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
