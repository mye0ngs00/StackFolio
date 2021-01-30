import { Verification } from 'src/auth/entity/verification.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../entity/post.entity';
import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { PostInformation } from '../entity/post-information.entity';
import { PostMetadata } from '../entity/post-metadata.entity';
import { PostLike } from '../entity/post-like.entity';
import { PostComment } from '../entity/post-comment.entity';

@EntityRepository(PostComment)
export class PostCommentRepository extends Repository<PostComment> {
  async createPostComment(userId: string, data: CreatePostDto) {}
}
