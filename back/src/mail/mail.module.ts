import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
    imports:[MailerModule.forRoot({
        transport: {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.G_MAIL_ID,
                pass: process.env.G_MAIL_PASS
            }
        }
    })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
