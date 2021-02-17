import { Injectable } from '@nestjs/common';
import { Question } from './entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from './repository/question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: QuestionRepository,
  ) {}

  async createQuestion(userId: string, data: CreateQuestionDto) {
    const question = await this.questionRepository.createPost(userId, data);
    return { question } as any;
  }
}
