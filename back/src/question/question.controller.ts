import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entity/question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createPost(@Req() req, @Body() data: CreateQuestionDto) {
    return this.questionService.createQuestion(req.user.id, data);
  }

  @Get()
  getQuestionAll() {
    return this.questionService.getQuestionAll();
  }

  @Patch(':question_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updatePost(
    @Req() req,
    @Param('question_id') questionId: string,
    @Body() data: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionService.updateQuestion(req.user.id, questionId, data);
  }

  @Post('like/:question_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiBearerAuth()
  likePost(@Req() req, @Param('question_id') questionId: string) {
    return this.questionService.likePost(req.user.id, questionId);
  }

  @Post('unlike/:question_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiBearerAuth()
  unlikePost(@Req() req, @Param('question_id') questionId: string) {
    return this.questionService.unlikePost(req.user.id, questionId);
  }

  @Delete(':question_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deletePost(
    @Req() req,
    @Param('question_id') postId: string,
  ): Promise<Question> {
    return this.questionService.deletePost(req.user.id, postId);
  }
}
