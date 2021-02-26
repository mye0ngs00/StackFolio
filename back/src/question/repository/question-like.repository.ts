import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { QuestionLike } from '../entity/question-like.entity';
import { Question } from '../entity/question.entity';

@EntityRepository(QuestionLike)
export class QuestionLikeRepository extends Repository<QuestionLike> {
  async createQuestionLike(
    user_id: string,
    question_id: string,
    // post_comment_id: string,
  ) {
    const questionLikeRepository = getRepository(QuestionLike);
    const questionRepository = getRepository(Question);

    let question = await questionRepository.findOne({ id: question_id });

    if (!question) {
      throw new NotFoundException('좋아할 질문이 없습니다.');
    }

    let questionLike = new QuestionLike();

    questionLike = {
      ...questionLike,
      user_id,
      question_id,
      //   post_comment_id,
    };
    console.log(questionLike);
    await questionLikeRepository.save(questionLike);
  }
}
