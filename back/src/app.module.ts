import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { FollowersModule } from './followers/followers.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule, CommentsModule, LikesModule, FollowersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
