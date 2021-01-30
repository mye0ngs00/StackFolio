import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(readonly mailerService: MailerService) {}

  public sendingMail(email: string, redirectUrl: string): void {
    this.mailerService
      .sendMail({
        to: email,
        from: 'ehgks00832@gmail.com',
        subject: 'Velog 회원가입 링크입니다',
        html: `<h1>h1 테스트</h1>
        <a href=${redirectUrl}>${redirectUrl}</a>`,
      })
      .then((s) => {
        // this.logger.verbose(`email 발송 성공 [${email}]`);
        // console.log("이메일 발송 성공",s);
      })
      .catch((e) => {
        // console.log("이메일 발송 에러",e);
      });
  }
}
