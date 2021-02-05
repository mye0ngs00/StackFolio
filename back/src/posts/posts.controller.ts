import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as _Post } from './entity/post.entity';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createPost(@Req() req, @Body() data: CreatePostDto): Promise<_Post> {
    return this.postsService.createPost(req.user.id, data);
  }

  @Get('')
  getPostsAll() {
    return this.postsService.getPostsAll();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMyPosts(@Req() req): Promise<_Post[]> {
    return this.postsService.getPosts(req.user.id, true);
  }

  @Get(':user_id')
  getPosts(@Param('user_id') userId: string): Promise<_Post[]> {
    return this.postsService.getPosts(userId);
  }

  @Get(':post_id')
  getPost(@Param('post_id') postId: string): Promise<_Post> {
    return this.postsService.getPost(postId);
  }

  @Patch(':post_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updatePost(
    @Req() req,
    @Param('post_id') postId: string,
    @Body() data: UpdatePostDto,
  ): Promise<_Post> {
    return this.postsService.updatePost(req.user.id, postId, data);
  }

  @Post('like/:post_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiBearerAuth()
  likePost(@Req() req, @Param('post_id') postId: string) {
    return this.postsService.likePost(req.user.id, postId);
  }

  @Post('unlike/:post_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiBearerAuth()
  unlikePost(@Req() req, @Param('post_id') postId: string) {
    return this.postsService.unlikePost(req.user.id, postId);
  }

  @Delete(':post_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deletePost(@Req() req, @Param('post_id') postId: string): Promise<_Post> {
    return this.postsService.deletePost(req.user.id, postId);
  }
}
