import { Controller, Get } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService,
        private readonly mailService: MailService){}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get("send-mail")
    sendMail(): any {
        try {
            this.mailService.sendingMail();
            return {message: "성공"};
        } catch (err) {
            return {message: "에러", err};
        }
    }
}
