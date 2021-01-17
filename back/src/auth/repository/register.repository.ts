import { Provider } from 'src/users/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRegisterDto } from '../dto/create-register.dto';
import { Register } from '../entity/register.entity';

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register> {
  async createRegister(data: CreateRegisterDto) {
    const { provider = Provider.LOCAL, social_id, email } = data;

    const register = this.create(data);

    try {
      await this.save(register);
    } catch (err) {
      // duplicate email (update provider and social id)
      if (err.code === '23505') {
        await this.update({ email }, { provider, social_id });
      }
    }

    return register;
  }
}
