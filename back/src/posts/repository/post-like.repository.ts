import { Verification } from 'src/auth/entity/verification.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../entity/post.entity';
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
import { User } from 'src/users/entity/user.entity';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { PostInformation } from '../entity/post-information.entity';
import { PostMetadata } from '../entity/post-metadata.entity';
import { PostLike } from '../entity/post-like.entity';

@EntityRepository(PostLike)
export class PostLikeRepository extends Repository<PostLike> {
  async createPostLike(
    user_id: string,
    post_id: string,
    // post_comment_id: string,
  ) {
    const postRepository = getRepository(Post);
    const postLikeRepository = getRepository(PostLike);

    let post = await postRepository.findOne({ id: post_id });
    if (!post) {
      throw new NotFoundException();
    }

    let postLike = new PostLike();

    // post_comment_id는 뭐지? 게시물 좋아요에 게시물 댓글이 들어가야하나?
    postLike = {
      ...postLike,
      user_id,
      post_id,
      //   post_comment_id,
    };
    console.log(postLike);
    await postLikeRepository.save(postLike);

    // post.
  }
}
