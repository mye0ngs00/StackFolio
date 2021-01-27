import { Verification } from 'src/auth/entity/verification.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PostInformation } from '../entity/post-information.entity';

@EntityRepository(PostInformation)
export class PostRepository extends Repository<PostInformation> {
  async createPostInformation() {}
}
