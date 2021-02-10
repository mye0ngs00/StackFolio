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

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async createPost(userId: string, data: CreateQuestionDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepository = getRepository(User);
      const questionRepository = getRepository(Question);

      const user = await userRepository.findOne({ id: userId });

      let question = new Question();
      question.title = data.title;
      question.contents = data.contents;

      user.questions = [question];

      await queryRunner.manager.save(question);
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return question;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
