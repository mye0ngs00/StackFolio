import { Injectable } from '@nestjs/common';
import { Question } from './entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from './repository/question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionLikeRepository } from './repository/question-like.repository';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionCommentRepository } from './repository/question-comment.repository';
import { CreateCommentQuestionDto } from './dto/create_comment_question';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: QuestionRepository,
    private readonly questionLikeRepository: QuestionLikeRepository,
    private readonly questionCommentRepository: QuestionCommentRepository,

  ) {}

  async createQuestion(userId: string, data: CreateQuestionDto) {
    const question = await this.questionRepository.createQuestion(userId, data);
    return { question } as any;
  }

  async getQuestionAll() {
    const questions = await this.questionRepository.find();
    return { questions };
  }

  async updateQuestion(
    userId: string,
    questionId: string,
    data: UpdateQuestionDto,
  ): Promise<Question> {
    let question = await this.questionRepository.findOne({
      id: questionId,
      user_id: userId,
    });

    question = {
      ...question,
      ...data,
    };
    await this.questionRepository.save(question);

    return { question } as any;
  }

  async deletePost(userid: string, questionId: string): Promise<Question> {
    const question = await this.questionRepository.findOne({
      id: questionId,
      user_id: userid,
    });

    await this.questionRepository.remove(question);
    return { question } as any;
  }

  // 질문 게시판 좋아요, 싫어요
  async likePost(userId: string, questionId: string) {
    this.questionLikeRepository.createQuestionLike(userId, questionId);
    return {} as any;
  }

  async unlikePost(userId: string, questionId: string) {
    const unlikePost = await this.questionLikeRepository.findOne({
      user_id: userId,
      question_id: questionId,
    });

    await this.questionLikeRepository.remove(unlikePost);
    return {} as any;
  }
  async getComments(question_id: string) {
    const comments = await this.questionCommentRepository.find({question_id});
    return {comments} as any;
  }

  async createComment(userId: string,question_id: string,  data: CreateCommentQuestionDto) {
    await this.questionCommentRepository.createQuestionComment(userId,question_id,  data);

    return {} as any;
  }
}
