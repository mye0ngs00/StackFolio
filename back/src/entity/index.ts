import { Post } from '@nestjs/common';
import { UserProfile } from './user-profile.entity';
import { User } from './user.entity';
import { Verification } from './verification.entity';
import { Comment } from './comment.entity';
import { Like } from 'typeorm';
import { Follower } from './follower.entity';

/**
 * @todo Specify comments system (currently comments are not applied to all entities)
 * @todo Add one-to-one, one-to-many, many-to-one, and many-to-many relations
 * @todo Add validation decorators (https://typeorm.io/#/validation)
 */
export const entities = [
  Verification,
  User,
  UserProfile,
  Post,
  Comment,
  Like,
  Follower,
];
