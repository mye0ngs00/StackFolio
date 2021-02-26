import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionInformation } from './entity/question-information.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionInformationRepository } from './repository/question-information.repository';
import { QuestionLikeRepository } from './repository/question-like.repository';
import { QuestionMetadataRepository } from './repository/question-metadata.repository';
import { QuestionRepository } from './repository/question.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionRepository,
      QuestionLikeRepository,
      QuestionInformationRepository,
      QuestionMetadataRepository,
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
