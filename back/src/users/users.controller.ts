import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserProfile } from './entity/user-profile.entity';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('send-mail')
  sendMail(): any {
      /**  @todo 나중에 삭제할 것 / 이메일 발송 테스트 중  **/
    try {
      this.mailService.sendingMail("ehgks0083@gmail.com", "https://naver.com");
      return { message: '성공' };
    } catch (err) {
      return { message: '에러', err };
    }
  }

  @Post('update')
  updateOne(@Body() updateUser: UpdateUserDTO): Promise<User> {
    return this.usersService.updateOne(updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
