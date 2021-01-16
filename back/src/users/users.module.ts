import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/UserRepository';
import { UserProfileRepository } from './repository/UserProfileRepository';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, UserProfileRepository]),
MailModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService],
})
export class UsersModule {}
