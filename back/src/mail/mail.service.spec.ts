import { MailerModule } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { mailConfig } from 'src/config/configuration';
import { MailService } from './mail.service';

describe('MailService', () => {
  let module: TestingModule;
  let mailService: MailService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MailerModule.forRoot(mailConfig)],
      providers: [MailService],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  test('mail service is defined', () => {
    expect(mailService).toBeDefined();
  });

  describe('sendingEmail', () => {
    test('sends an email', () => {
      const email = 'test@example.com';
      const redirectUrl = 'redirect-url';

      jest
        .spyOn(mailService.mailerService, 'sendMail')
        .mockImplementation(async () => {}); // Just check if this is properly called

      mailService.sendingMail(email, redirectUrl);
      expect(mailService.mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailService.mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        from: 'ehgks00832@gmail.com',
        subject: 'Velog 회원가입 링크입니다',
        html: `<h1>h1 테스트</h1>
        <a href=${redirectUrl}>${redirectUrl}</a>`,
      });
    });
  });
});
