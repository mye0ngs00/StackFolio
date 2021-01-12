import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {LocalStrategy} from "./passport/local.strategy"
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { GoogleStrategy } from './passport/google.strategy';

@Module({
    imports:[UsersModule,PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions:{expiresIn: "60s"},
    })],
  providers: [AuthService, LocalStrategy, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
