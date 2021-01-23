import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Provider, User } from 'src/users/entity/user.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { CreateRegisterDto } from '../dto/create-register.dto';
import { Register } from '../entity/register.entity';

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register> {
  async createRegister(data: CreateRegisterDto) {
    const { provider = Provider.LOCAL, social_id, email } = data;

    // Throw error if user is already registered
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email });
    if (user) {
      throw new BadRequestException('User is already registered');
    }

    // Create new register record
    const register = this.create(data);

    try {
      await this.save(register);
    } catch (err) {
      if (err.code === '23505') {
        await this.update({ email }, { provider, social_id });
      }
      throw new InternalServerErrorException();
    }

    return register;
  }
}
