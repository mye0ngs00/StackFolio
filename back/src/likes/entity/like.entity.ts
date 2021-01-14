import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Check,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user_id', 'post_id'])
@Unique(['user_id', 'comment_id'])
@Check(`
  COALESCE(LENGTH(post_id::text)::boolean::integer, 0)
	+
	COALESCE(LENGTH(comment_id::text)::boolean::integer, 0)
  = 1
`)
export class Like {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('uuid')
  user_id: string;

  @Column('uuid', { nullable: true })
  post_id: string;

  @Column('uuid', { nullable: true })
  comment_id: string;
}
