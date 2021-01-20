import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entity/user-profile.entity';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
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
