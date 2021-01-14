import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  Check,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Post } from '../../posts/entity/post.entity';
import { Comment } from 'src/comments/entity/comment.entity';

export enum Provider {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

@Entity()
@Unique(['email'])
@Check(`
  COALESCE((provider = 'local')::integer, 0) 
  + 
  COALESCE(LENGTH(social_id::text)::boolean::integer, 0)
  = 1
`)
export class User {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  readonly updated_at: Date;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  provider: Provider;

  @Column({ length: 255, nullable: true })
  social_id?: string;

  @Column({ length: 255 })
  email: string;

  @Column({ default: false })
  is_verified: boolean;

  /** Relations */

  @ManyToMany((type) => User, (user) => user.following)
  @JoinTable({
    name: 'follower',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' },
  })
  followers: User[];

  @ManyToMany((type) => User, (user) => user.followers)
  following: User[];

  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];
}
