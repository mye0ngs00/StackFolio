import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    const { register_code, email, username, bio } = data;
    const registerRepository = getRepository(Register);

    const register = await registerRepository.findOne({ code: register_code });

    // 고의로 register_code 또는 email을 조작하는 경우
    if (!register || register.email !== email) {
      throw new BadRequestException('그르즈므르');
    }

    const { provider, social_id } = register;

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

    try {
      await this.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username conflict');
      }
      throw new InternalServerErrorException();
    }

    return newUser;
  }
}
