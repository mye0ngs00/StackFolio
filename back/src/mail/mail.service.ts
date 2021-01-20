import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendingMail(): void {
    this.mailerService
      .sendMail({
        to: 'ehgks0083@gmail.com',
        from: 'ehgks00832@gmail.com',
        subject: 'Testing NestJS MailerModule',
        text: 'Welcome Mailer !',
        html: `<div>
            <a href="localhost:3000">링크</a>
            </div>`, //링크가 안가지네
      })
      .then((s) => {
        console.log(s);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
