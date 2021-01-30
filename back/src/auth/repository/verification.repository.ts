import { BadRequestException } from '@nestjs/common';
import { getConnection, EntityRepository, Repository } from 'typeorm';
import { Verification } from '../entity/verification.entity';

@EntityRepository(Verification)
export class VerificationRepository extends Repository<Verification> {
  async verifyCodeAndGetUserProfile(code: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find associated verification record
      const verification = await this.findOneOrFail({ code });
      // Remove verification record (should be used only one-time)
      await queryRunner.manager.remove(verification);
      const userProfile = await queryRunner.query(
        `SELECT * FROM "user_profile" WHERE user_id = '${verification.user_id}'`,
      );
      await queryRunner.commitTransaction();
      return userProfile;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Invalid verification code');
    } finally {
      await queryRunner.release();
    }
  }
}
