import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './passport/google.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repository/UserRepository';
import { UserProfileRepository } from 'src/users/repository/UserProfileRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserProfileRepository]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, //process.env.JWT_SECRET
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, GoogleStrategy, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
