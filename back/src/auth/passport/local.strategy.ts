import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: "email"});
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('로컬 스트레티지', username);
    console.log('로컬 스트레티지', password);
    const user = await this.authService.validateUser(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    // console.log(user);
    return user;
  }
}
