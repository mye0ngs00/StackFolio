import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserProfile } from './entity/user-profile.entity';
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
        return await this.userRepository.find({relations: ["profile"]});
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

      async updateOne(updateUser: UpdateUserDTO): Promise<User>{
        const user = await this.userRepository.findOne({email: updateUser.email},{relations:["profile"]});
        user.profile.username = updateUser.username;
        await this.userRepository.save(user);
        // await this.userProfileRepository.save(user.profile);
        // user, userprofile entity 1:1관계를 두 파일데 다 명시 해놓음
        // userrepository랑 userprofilerepository를 둘다 저장을 해줘야 하나?

        return user;
    }

    async delete(userData: DeleteUserDTO): Promise<User> {
        const user = await this.userRepository.findOne({email: userData.email});
        await this.userRepository.remove(user);
    
        return user;
    }
}
