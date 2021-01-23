import { BadRequestException, ConflictException } from '@nestjs/common';
import { Register } from 'src/auth/entity/register.entity';
import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(data: CreateUserDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { register_code, email, username, bio } = data;

      // Verify register code
      const registerRepository = getRepository(Register);
      const register = await registerRepository.findOne({
        code: register_code,
      });
      if (!register || register.email !== email) {
        throw new BadRequestException();
      }

      // Create new user
      const { provider, social_id } = register;
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

      await queryRunner.manager.save(newUser);
      await queryRunner.manager.remove(register);
      await queryRunner.commitTransaction();

      return newUser;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err.code === '23505') {
        throw new ConflictException('Username conflict');
      }
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
