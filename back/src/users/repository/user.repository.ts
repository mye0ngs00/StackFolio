import { BadRequestException } from '@nestjs/common';
import { Register } from 'src/auth/entity/register.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByName(firstName: string, lastName: string) {
    return this.findOne({});
  }

  async createNewUser(data: CreateUserDto) {
    const { register_code, username, bio } = data;
    const registerRepository = getRepository(Register);

    const register = await registerRepository.findOne({ code: register_code });

    if (!register) {
      throw new BadRequestException();
    }

    const { provider, social_id, email } = register;

    // 처음부터 이메일 인증이라서 'is_verified'를 빼도 될 것 같은데..?
    const newUser = this.create({
      provider,
      social_id,
      email,
      is_verified: true,
      profile: {
        username,
        bio,
      },
    });

    await this.save(newUser);
    return newUser;
  }
}
