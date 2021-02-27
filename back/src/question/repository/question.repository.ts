import { Verification } from 'src/auth/entity/verification.entity';

import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { Question } from '../entity/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionInformation } from '../entity/question-information.entity';
import { QuestionMetadata } from '../entity/question-metadata.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async createQuestion(userId: string, data: CreateQuestionDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepository = getRepository(User);
      //   const questionRepository = getRepository(Question);
      //   const qustionInformationRepository = getRepository(QuestionInformation);
      //   const qustionMetaDataRepository = getRepository(QuestionMetadata);
      const user = await userRepository.findOne({ id: userId });
      if (!user) {
        throw new NotFoundException("질문을 작성할 유저가 존재하지 않습니다!");
      }

      let question = new Question();
      question.title = data.title;
      question.contents = data.contents;

      const information = new QuestionInformation();
      const metadata = new QuestionMetadata();

      question.information = information;
      question.metadata = metadata;
      question.user_id = user.id;

      //   user.questions = [question];

      await queryRunner.manager.save(question);
      await queryRunner.manager.save(information);
      await queryRunner.manager.save(metadata);
      //   await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return question;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
