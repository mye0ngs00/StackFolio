import { BadRequestException } from '@nestjs/common';
import { getConnection, EntityRepository, Repository } from 'typeorm';
import { Verification } from '../entity/verification.entity';

@EntityRepository(Verification)
export class VerificationRepository extends Repository<Verification> {
  async verifyCodeAndGetUser(code: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find associated verification record
      const verification = await this.findOneOrFail({ code });
      const user = verification.user;
      // Remove verification record (should be used only one-time)
      await queryRunner.manager.remove(verification);
      await queryRunner.commitTransaction();
      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }
}
