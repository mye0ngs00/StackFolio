import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostInformation } from 'src/posts/entity/post-information.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfile } from './entity/user-profile.entity';
import { User } from './entity/user.entity';
import { UserFavoriteRepository } from './repository/user-favorite.repository';
import { UserProfileRepository } from './repository/user-profile.repository';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly userFavoriteRepository: UserFavoriteRepository,
    private readonly userProfileRepository: UserProfileRepository, // private readonly userFollowerRepository: Repository<Follow>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find({
      relations: ['favorites', 'followers', 'following'],
    });
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
  //내 팔로워들 보기
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
  //내 팔로잉들 보기
  async getFollowings(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne(
      { id: userId },
      { relations: ['following'] },
    );
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }
    return user.following;
  }
  // 팔로잉하기
  async getFollowing(User: User, userId: string) {
    if (User.id === userId) {
      throw new BadRequestException('자기 자신을 팔로잉 할 수 없습니다!');
    }
    const user = await this.userRepository.findOne(
      { id: userId },
      { relations: ['following'] },
    );
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }
    user.followers = [User];
    this.userRepository.save(user);
    return user.following;
  }
  //팔로잉 끊기 (언팔)
  async unFollowing(myId: string, userId: string) {
    const user = await this.userRepository.findOne(
      { id: userId },
      { relations: ['following', 'followers'] },
    );
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }

    user.followers = user.followers.filter((follower) => {
      follower.id !== myId;
    });
    await this.userRepository.save(user);
    return user.followers;
  }
  //팔로워 끊기

  async unFollower(myId: string, userId: string) {
    const user = await this.userRepository.findOne(
      { id: userId },
      { relations: ['following', 'followers'] },
    );
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }
    user.following = user.following.filter((following) => {
      following.id !== myId;
    });
    await this.userRepository.save(user);
    // user.removeFollowers(myId);

    return user.following;
  }
  async getFavorites(user_id: string) {
    const favorites = await this.userFavoriteRepository.find({ user_id });
    return favorites;
  }
  async addFavorite(user_id: string, post_id: string) {
    const favorites = await this.userFavoriteRepository.createFavorite(
      user_id,
      post_id,
    );

    return favorites;
  }
  async deleteFavorite(user_id: string, favorite_id: string) {
    try {
      const favorite = await this.userFavoriteRepository.findOne({
        id: favorite_id,
      });

      await this.userFavoriteRepository.remove(favorite);

      return favorite;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async deleteUser(user: User) {
    await this.userRepository.delete(user.id);
    return user;
  }
}
