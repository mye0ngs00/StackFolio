import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }

  async validate(email: string) : Promise<any> {
    const user = await this.authService.validateUser(email);
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
  }
}

