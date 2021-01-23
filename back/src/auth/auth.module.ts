import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './passport/google.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repository/user.repository';
import { UserProfileRepository } from 'src/users/repository/user-profile.repository';
import { RegisterRepository } from './repository/register.repository';
import { VerificationRepository } from './repository/verification.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserProfileRepository,
      RegisterRepository,
      VerificationRepository,
    ]),
    MailService,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async ($: ConfigService) => ({
        secret: $.get<string>('jwt-key'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, GoogleStrategy, JwtStrategy, MailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
