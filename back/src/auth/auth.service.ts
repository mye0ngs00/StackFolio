import {
  BadRequestException,
  Injectable,
  Logger,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/repository/user.repository';
import { RegisterRepository } from './repository/register.repository';
import { VerificationRepository } from './repository/verification.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccessTokenDto } from './dto/acess-token.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
      private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly registerRepository: RegisterRepository,
    private readonly verificationRepository: VerificationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async register(data: CreateUserDto): Promise<AccessTokenDto> {
    const newUser = await this.userRepository.createUser(data);

    return {
      accessToken: this.jwtService.sign({ userId: newUser.id }),
    };
  }

  async socialLogin(@Req() req, @Res() res): Promise<AccessTokenDto> {
    const { provider, social_id, email } = req.user;
    this.logger.verbose(`New social login [${email}]`);
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      const register = await this.registerRepository.createRegister({
        provider,
        social_id,
        email,
      });
      const client = 'http://localhost:3000'; /** @todo Update to client url */
      const redirectUrl = `${client}/register?code=${register.code}&email=${register.email}`;
      return res.redirect(encodeURI(redirectUrl));
    }

    /** @todo 여기서 redirect랑 return 중 어떻게? */
    // res.append(
    //   'Authorization',
    //   `Bearer ${this.jwtService.sign({ userId: user.id })}`,
    // );
    // res.redirect(client);

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  // For users who create with there personal mail
  async sendRegisterMail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new BadRequestException('이미 회원가입된 email입니다.', email);
    }
    const exRegister = await this.registerRepository.findOne({email});
    if (exRegister) {
        throw new BadRequestException('registerRepo에 등록된 email입니다.', email);
        // return {
        //     message: "registerRepo에 이미 등록되어있는 email입니다", 
        //     email: exRegister.email
        // }
    }
    try {
        //이메일 발송 되는 것 확인완료
        const register = await this.registerRepository.createRegister({ email });
          
        const client = 'http://localhost:3000'; /** @todo Update to client url */
        const redirectUrl = `${client}/register?code=${register.code}&email=${register.email}`;

        this.mailService.sendingMail(email, redirectUrl);

        return {message: "회원가입 이메일 발송 성공", email: register.email, redirectUrl};
        //   return res.redirect(encodeURI(redirectUrl));

    } catch (e) {
        console.error("send-register-mail",e);
    }
    // const link = http://:client/register?code={register.code}&email={register.email}
    /** @todo Send mail with a register link */
  }

  async sendLoginMail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const verification = this.verificationRepository.create({ user });
    await this.verificationRepository.save(verification);

    // const link = http://:client/verify?code={verification.code}
    /** @todo Send mail with a login link */
  }

  async loginWithCode(code: string): Promise<LoginDto> {
    const userProfile = await this.verificationRepository.verifyCodeAndGetUserProfile(
      code,
    );
    return {
      profile: userProfile,
      accessToken: this.jwtService.sign({ userId: userProfile.user_id }),
    };
  }
}
