import { IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from 'src/posts/entity/post.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('uuid')
  @IsUUID('4')
  user_id!: string;

  @Column('uuid')
  @IsUUID('4')
  post_id!: string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Post, (post) => post.favorites)
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
