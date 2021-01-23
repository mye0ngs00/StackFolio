import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entity/post.entity';

@Injectable()
export class PostsService {
  async createPost(userId: string, data: CreatePostDto) {
    return {} as any;
  }

  async getPosts(userId: string, includePrivate = false): Promise<Post[]> {
    return {} as any;
  }

  async getPost(postId: string): Promise<Post> {
    return {} as any;
  }

  async updatePost(
    userId: string,
    postId: string,
    data: UpdatePostDto,
  ): Promise<Post> {
    return {} as any;
  }

  async deletePost(postId: string): Promise<Post> {
    return {} as any;
  }

  async likePost(userId: string, postId: string) {
    return {} as any;
  }

  async unlikePost(userId: string, postId: string) {
    return {} as any;
  }
}
