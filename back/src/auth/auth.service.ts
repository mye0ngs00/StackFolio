import { BadRequestException, Injectable, Req, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { UserRepository } from 'src/users/repository/user.repository';
import { UserProfileRepository } from 'src/users/repository/user-profile.repository';
import { RegisterRepository } from './repository/register.repository';
import { VerificationRepository } from './repository/verification.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly registerRepository: RegisterRepository,
    private readonly verificationRepository: VerificationRepository,
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async validateUser(username: string, email: string): Promise<any> {
    // console.log(email, pass);
    const user = await this.userService.findOne(email);
    // local 로그인할 때 password를 사용한다면 여기다 bcyrpt 사용
    if (user && user.email) {
      //여기다가 JWT 생성?
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async register(data: CreateUserDto) {
    const newUser = await this.userRepository.createNewUser(data);

    // 최초 가입시 토큰만 발행해줘도 될 것 같은데 (내 프로필 들어갈 때 토큰을 가지고 request를 날릴 것이므로)
    // velog도 보면 첫 페이지에 필요한 데이터를 local storage에 담긴 하는데 우리는 어떻게 할까요?
    return {
      access_token: this.jwtService.sign({ userId: newUser.id }),
    };
  }

  // velog처럼 이메일 로그인 시 > 이메일 발송 > 이메일 내 링크 클릭 > velog로 리디렉션 후 토큰발급
  login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async socialLogin(@Req() req, @Res() res) {
    const { provider, social_id, email } = req.user;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      const register = await this.registerRepository.createRegister({
        provider,
        social_id,
        email,
      });
      const client = 'http://localhost:3000'; /** @todo Update to client url */
      const redirectUrl = `${client}/register?code=${register.code}&email${register.email}`;
      return res.redirect(encodeURI(redirectUrl));
    }

    return {
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }

  // 그냥 이메일로 로그인 시
  async sendRegisterMail(email: string) {
    const register = await this.registerRepository.createRegister({ email });

    // register.code + register.email
    /** @todo Send mail with a register link [http://<client>/register?code={code}&email={email}] */
  }

  async sendLoginMail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const verification = this.verificationRepository.create({ user });

    // verification.code
    /** @todo Send mail with a login link [http://<client>/verify?code={code}] */
  }

  async loginWithCode(code: string) {
    const user = await this.verificationRepository.verifyCodeAndGetUser(code);
    return {
      user,
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }
}
