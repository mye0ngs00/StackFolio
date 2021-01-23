import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserProfile } from './entity/user-profile.entity';
import { User } from './entity/user.entity';
import { UserProfileRepository } from './repository/user-profile.repository';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async createUser(data: CreateUserDto) {
    return this.userRepository.createUser(data);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['profile'] });
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

  async updateOne(updateUser: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(
      { email: updateUser.email },
      { relations: ['profile'] },
    );
    user.profile.username = updateUser.username;
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });
    await this.userRepository.remove(user);
    return user;
  }
}
