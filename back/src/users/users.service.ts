import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async getUserProfile(userId: string): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.findOne({
      user_id: userId,
    });
    return userProfile;
  }

  async updateUserProfile(
    userId: string,
    data: UpdateUserDto,
  ): Promise<UserProfile> {
    let userProfile = await this.getUserProfile(userId);
    userProfile = {
      ...userProfile,
      ...data,
    };
    const updatedUserProfile = await this.userProfileRepository.save(
      userProfile,
    );
    return updatedUserProfile;
  }

  async deleteUser(user: User) {
    await this.userRepository.delete(user.id);
    return user;
  }
}
