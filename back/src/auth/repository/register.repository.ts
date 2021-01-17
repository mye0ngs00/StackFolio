import { BadRequestException } from '@nestjs/common';
import { Provider, User } from 'src/users/entity/user.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { CreateRegisterDto } from '../dto/create-register.dto';
import { Register } from '../entity/register.entity';

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register> {
  async createRegister(data: CreateRegisterDto) {
    const { provider = Provider.LOCAL, social_id, email } = data;

    // 이미 가입한 사용자면 안된다.
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email });

    if (user) {
      throw new BadRequestException('User is already registered');
    }

    // 새로운 register record를 만든다.
    const register = this.create(data);

    try {
      await this.save(register);
    } catch (err) {
      // 여기로 왔다는 것은,
      // 1. internal server error (매우 희박)
      // 2. 아직 가입을 안한 사용자가 register 신청을 했는데 하라고 할 때 안하고 나중에 다시 찾아와서 신청한 경우

      // code = '23505' = duplicate email
      if (err.code === '23505') {
        // 업데이트를 하는 이유는,
        // 기존에 facebook으로 가입을 하려고 했던 유저가 같은 email을 사용하는 google 계정으로 다시 시도한 경우를 위해
        await this.update({ email }, { provider, social_id });
      }
    }

    return register;
  }
}
