import { Verification } from 'src/auth/entity/verification.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PostMetadata } from '../entity/post-metadata.entity';

@EntityRepository(PostMetadata)
export class PostRepository extends Repository<PostMetadata> {}
