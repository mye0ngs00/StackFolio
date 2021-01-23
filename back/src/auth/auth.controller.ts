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
import {
  ApiExcludeEndpoint,
  ApiOAuth2,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiMovedPermanentlyResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/acess-token.dto';
import { SendMailDto } from './dto/send-mail.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import docs from './auth.docs';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation(docs.get['google'].operation)
  @ApiOAuth2(['email', 'profile'], 'google')
  @ApiOkResponse(docs.get['google'].response[200])
  @ApiMovedPermanentlyResponse(docs.get['google'].response[301])
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res) {
    return this.authService.socialLogin(req, res);
  }

  @Post('send-register-mail')
  @ApiOperation(docs.post['send-register-mail'].operation)
  @ApiCreatedResponse(docs.post['send-register-mail'].response[201])
  @ApiBadRequestResponse(docs.post['send-register-mail'].response[400])
  @ApiInternalServerErrorResponse(docs.error[500])
  sendRegisterMail(@Body() { email }: SendMailDto) {
    return this.authService.sendRegisterMail(email);
  }

  @Post('send-login-mail')
  @ApiOperation(docs.post['send-login-mail'].operation)
  @ApiCreatedResponse(docs.post['send-login-mail'].response[201])
  @ApiBadRequestResponse(docs.post['send-login-mail'].response[400])
  @ApiInternalServerErrorResponse(docs.error[500])
  sendLoginMail(@Body() { email }: SendMailDto) {
    return this.authService.sendLoginMail(email);
  }

  @Post('register')
  @ApiOperation(docs.post['register'].operation)
  @ApiCreatedResponse(docs.post['register'].response[201])
  @ApiBadRequestResponse(docs.post['register'].response[400])
  @ApiConflictResponse(docs.post['register'].response[409])
  register(@Body() data: CreateUserDto): Promise<AccessTokenDto> {
    return this.authService.register(data);
  }

  @Get('verify/:code')
  @ApiOperation(docs.get['verify/:code'].operation)
  @ApiOkResponse(docs.get['verify/:code'].response[200])
  @ApiBadRequestResponse(docs.get['verify/:code'].response[400])
  loginWithCode(@Param('code') code: string) {
    return this.authService.loginWithCode(code);
  }
}
