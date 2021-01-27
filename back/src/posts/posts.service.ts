import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileRepository } from 'src/users/repository/user-profile.repository';
import { UserRepository } from 'src/users/repository/user.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entity/post.entity';
import { PostLikeRepository } from './repository/post-like.repository';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly postLikeRepository: PostLikeRepository,
  ) {}

  async createPost(userId: string, data: CreatePostDto): Promise<Post> {
    const post = await this.postRepository.createPost(userId, data);
    console.log(post);
    return {} as any;
  }

  async getPostsAll() {
    const posts = await this.postRepository.find();
    // 왜 post 전체 다 안불러질까?
    // console.log(posts);

    return { posts };
  }

  // 유저의 post 불러오기
  async getPosts(userId: string, includePrivate = false): Promise<Post[]> {
    const post = await this.postRepository.find({ user_id: userId });
    // console.log(post);
    return { post } as any;
  }
  // postid의 post 불러오기
  async getPost(postId: string): Promise<Post> {
    const post = await this.postRepository.find({ id: postId });
    return { post } as any;
  }

  async updatePost(
    userId: string,
    postId: string,
    data: UpdatePostDto,
  ): Promise<Post> {
    let post = await this.postRepository.findOne({
      id: postId,
      user_id: userId,
    });

    post = {
      ...post,
      ...data,
    };
    await this.postRepository.save(post);

    return { post } as any;
  }

  async deletePost(userid: string, postId: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      id: postId,
      user_id: userid,
    });

    await this.postRepository.remove(post);
    return { post } as any;
  }

  async likePost(userId: string, postId: string) {
    this.postLikeRepository.createPostLike(userId, postId);
    return {} as any;
  }

  async unlikePost(userId: string, postId: string) {
    const unlikePost = await this.postLikeRepository.findOne({
      user_id: userId,
      post_id: postId,
    });

    await this.postLikeRepository.remove(unlikePost);
    return {} as any;
  }
}
