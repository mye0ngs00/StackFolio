import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserProfileRepository } from './repository/UserProfileRepository';
import { UserRepository } from './repository/UserRepository';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly userProfileRepository: UserProfileRepository,
    ){}

    async findAll(): Promise<User[]>{
        return await this.userRepository.find();
    }



    async findOne(email: string): Promise<User | undefined> {
        try {
        //   console.log('userService : ', email);
        //   console.log('userService : ', email['username']);
          const user = await this.userRepository.findOne({ email });
          return user;
        } catch (e) {
          return e;
        }
      }
}
