import { Verification } from 'src/auth/entity/verification.entity';
import { EntityRepository, Repository } from 'typeorm';
import { QuestionInformation } from '../entity/question-information.entity';

@EntityRepository(QuestionInformation)
export class QuestionInformationRepository extends Repository<QuestionInformation> {
  async createPostInformation() {}
}
