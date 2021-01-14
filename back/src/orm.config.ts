import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Verification } from './auth/entity/verification.entity';
import { Post } from './posts/entity/post.entity';
import { User } from './users/entity/user.entity';
import { UserProfile } from './users/entity/user-profile.entity';
import { PostMetadata } from './posts/entity/post-metadata.entity';
import { PostInformation } from './posts/entity/post-information.entity';
import { Like } from './likes/entity/like.entity';
import { Comment } from './comments/entity/comment.entity';

const inContainer = Boolean(process.env.IN_CONTAINER);
const isDev = process.env.NODE_ENV === 'development';

const entities = [
  Verification,
  User,
  UserProfile,
  Post,
  PostMetadata,
  PostInformation,
  Comment,
  Like,
];

/**
 * TypeORM connection options
 * @constant
 * @type {TypeOrmModuleOptions}
 * @description Sets the connection options based on current enviroment
 */
export const config: TypeOrmModuleOptions = inContainer
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
      password: 'root',
      port: 5432,
      host: '127.0.0.1',
      database: 'nest-typeorm',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    };
