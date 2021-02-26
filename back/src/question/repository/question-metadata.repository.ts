import { Verification } from 'src/auth/entity/verification.entity';
import { EntityRepository, Repository } from 'typeorm';
import { QuestionMetadata } from '../entity/question-metadata.entity';

@EntityRepository(QuestionMetadata)
export class QuestionMetadataRepository extends Repository<QuestionMetadata> {}
