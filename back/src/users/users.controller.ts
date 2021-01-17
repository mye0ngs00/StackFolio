import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserProfile } from './entity/user-profile.entity';
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
    @Post("update")
    updateOne(@Body() updateUser: UpdateUserDTO): Promise<User>{
        return this.userService.updateOne(updateUser);
    }

    @Delete("delete")
    deleteUser(@Body() deleteUser: DeleteUserDTO): Promise<User>{
        return this.userService.delete(deleteUser);
    }
}
