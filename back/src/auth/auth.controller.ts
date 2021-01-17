import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth(@Req() req) {
    console.log(req.cookies);
    return { message: 'auth' };
  }

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('local')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res) {
    return this.authService.socialLogin(req, res);
  }

  @Post('send-register-mail')
  sendRegisterMail(@Body() { email }) {
    return this.authService.sendRegisterMail(email);
  }

  @Post('send-login-mail')
  sendLoginMail(@Body() { email }) {
    return this.authService.sendLoginMail(email);
  }

  @Get('login/:code')
  loginWithCode(@Param('code') code: string) {
    return this.authService.loginWithCode(code);
  }
}
