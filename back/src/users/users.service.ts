import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostInformation } from 'src/posts/entity/post-information.entity';
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

  async getAllUsers() {
    const users = await this.userRepository.find();
    return { users };
  }

  async getUserProfile(user_id: string): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.findOne({
      user_id,
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

  async getFollowers(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne(
      { id: userId },
      { relations: ['followers'] },
    );
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }
    return user.followers;
  }

  async getFollowing(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne(
      { id: userId },
      { relations: ['following'] },
    );
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }
    return user.following;
  }

  async getFavorites(userId: string): Promise<PostInformation[]> {
    const favorites = await this.userRepository.findFavorites(userId);
    return favorites;
  }

  async deleteUser(user: User) {
    await this.userRepository.delete(user.id);
    return user;
  }
}
