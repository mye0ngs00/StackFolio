import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Provider } from 'src/users/entity/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);
  constructor(private readonly $: ConfigService) {
    super({
      clientID: $.get<string>('passport.google.[client-id]'),
      clientSecret: $.get<string>('passport.google.[client-secret]'),
      callbackURL: $.get<string>('passport.google.[callback-url]'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { email, sub } = profile._json;

    const user = {
      provider: Provider.GOOGLE,
      social_id: sub,
      email,
    };

    done(null, user);
  }
}
