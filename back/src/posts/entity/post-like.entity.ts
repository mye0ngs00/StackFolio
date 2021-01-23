import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  Check,
} from 'typeorm';
import { IsUUID } from 'class-validator';

@Entity()
@Unique(['user_id', 'post_id'])
@Unique(['user_id', 'post_comment_id'])
@Check(`
  COALESCE(LENGTH(post_id::text)::boolean::integer, 0)
	+
	COALESCE(LENGTH(post_comment_id::text)::boolean::integer, 0)
  = 1
`)
export class PostLike {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('uuid')
  @IsUUID('4')
  user_id: string;

  @Column('uuid')
  @IsUUID('4')
  post_id: string;

  @Column('uuid')
  @IsUUID('4')
  post_comment_id: string;
}
