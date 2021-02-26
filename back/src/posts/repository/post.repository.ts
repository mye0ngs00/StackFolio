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

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(userId: string, data: CreatePostDto) {
    const userRepository = getRepository(User);
    const userProfileRepository = getRepository(UserProfile);
    const postRepository = getRepository(Post);
    const postInformationRepository = getRepository(PostInformation);
    const postMetadataRepository = getRepository(PostMetadata);

    // const post = postRepository.create();

    const userProfile = await userProfileRepository.findOne(
      {
        user_id: userId,
      },
      { relations: ['user'] },
    );

    const user = userProfile.user;
    // console.log('유저 프로필 : ', user);

    let post = new Post();
    post.title = data.title;
    post.contents = data.contents;
    // post.author = user;
    post.user_id = user.id;

    const information = new PostInformation();
    const metadata = new PostMetadata();
    post.information = information;
    post.metadata = metadata;

    // await postInformationRepository.save(information);
    // await postMetadataRepository.save(metadata);
    // await postRepository.save(post);

    try {
      await postInformationRepository.save(information);
      await postMetadataRepository.save(metadata);
      await postRepository.save(post);
      //   await userRepository.save(user);
    } catch (err) {
      console.error(err);
    }
    return post;
  }
}
