import { BadRequestException } from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Favorite } from '../entity/user-favorite.entity';
import { User } from '../entity/user.entity';

@EntityRepository(Favorite)
export class UserFavoriteRepository extends Repository<Favorite> {
  async createFavorite(user_id: string, post_id: string) {
    const userRepository = getRepository(User);
    const userFavoriteRepository = getRepository(Favorite);

    const x = await userFavoriteRepository.findOne({
      user_id: user_id,
      post_id: post_id,
    });
    if (x) {
      throw new BadRequestException('already add favorite');
    }

    let favorite = new Favorite();
    // favorite.user = user_id;
    // favorite.post = post_id;
    favorite.user_id = user_id;
    favorite.post_id = post_id;

    try {
      await userFavoriteRepository.save(favorite);
    } catch (error) {
      console.error(error);
    }
    return favorite;
  }

  findByName(firstName: string, lastName: string) {
    return this.findOne({});
  }

  //   async createAndSave(userData: CreateUserDto) {
  //     const { username, age } = userData;
  //     const profile = new Profile();
  //     profile.age = age;

  //     await this.save(profile);
  //     return profile;
  //   }
}
