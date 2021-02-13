import { Verification } from 'src/auth/entity/verification.entity';

import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { Question } from '../entity/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionLike } from '../entity/question-like.entity';

@EntityRepository(QuestionLike)
export class PostLikeRepository extends Repository<QuestionLike> {
  async createPostLike(userId: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const question_like = new QuestionLike();

      await queryRunner.manager.save(question_like);

      // const PostLikeRepository = this.findOne
      return question_like;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
