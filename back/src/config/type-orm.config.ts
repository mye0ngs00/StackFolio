import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Verification } from '../auth/entity/verification.entity';
import { Register } from '../auth/entity/register.entity';
import { Post } from '../posts/entity/post.entity';
import { User } from '../users/entity/user.entity';
import { UserProfile } from '../users/entity/user-profile.entity';
import { PostMetadata } from '../posts/entity/post-metadata.entity';
import { PostInformation } from '../posts/entity/post-information.entity';
import { PostLike } from 'src/posts/entity/post-like.entity';
import { Tag } from 'src/tags/entity/tag.entity';
import { PostComment } from 'src/posts/entity/post-comment.entity';

const inContainer = Boolean(process.env.IN_CONTAINER);
const isDev = process.env.NODE_ENV === 'development';

const entities = [
  Verification,
  Register,
  User,
  UserProfile,
  Post,
  PostMetadata,
  PostInformation,
  PostLike,
  PostComment,
  Tag,
];

/**
 * TypeORM connection options
 * @constant
 * @type {TypeOrmModuleOptions}
 * @description Sets the connection options based on current enviroment
 */
export const typeOrmConfig: TypeOrmModuleOptions = inContainer
  ? {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: isDev,
      logging: isDev,
      entities,
    }
  : {
      type: 'postgres',
      username: 'postgres',
      password: 'dhfpswl112',
      port: 5432,
      host: '127.0.0.1',
      database: 'nest-typeorm',
      synchronize: true,
      entities, // Static glob paths (e.g., dist/**/*.entity{ .ts,.js}) has weird behaviors
    };
