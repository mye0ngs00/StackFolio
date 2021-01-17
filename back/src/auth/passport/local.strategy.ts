import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, email: string): Promise<any> {
    console.log('로컬 스트레티지', username, email);
    const user = await this.authService.validateUser(username, email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
