import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { UserRepository } from 'src/users/repository/UserRepository';
import { UserProfileRepository } from 'src/users/repository/UserProfileRepository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService, 
        private readonly userRepository: UserRepository, 
        private readonly userProfileRepository: UserProfileRepository
        ){}

        async validateUser(email: string): Promise<any> {
            // console.log(email, pass);
            const user = await this.userService.findOne(email);
            // local 로그인할 때 password를 사용한다면 여기다 bcyrpt 사용
            if (user && user.email) {
              //여기다가 JWT 생성?
              const {  ...result } = user;
              return result;
            }
            return null;
          }

    async register(userData: CreateUserDto) {
        const {email, username} = userData;

        const user = new User();
        user.email = email;
        await this.userRepository.save(user);
        
        const profile = new UserProfile();
        profile.username = username;
        profile.user = user;

        await this.userProfileRepository.save(profile);
        // user.password = password;
        return {user, profile};
    }
// velog처럼 이메일 로그인 시 > 이메일 발송 > 이메일 내 링크 클릭 > velog로 리디렉션 후 토큰발급
    login(user: any) { 
    // console.log(user);

        const payload = {
            username: user.username,
            sub: user.userId,
        };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        }
    }

    googleLogin(req) {
        if (!req.user) {
          return 'No user from google';
        }
    
        return {
          message: 'User information from google',
          user: req.user,
        };
      }
}
