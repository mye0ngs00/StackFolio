import { IsUUID } from 'class-validator';
import { Post } from 'src/posts/entity/post.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Series_posts } from './series_post.entity';

@Entity()
export class Series {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly updated_at: Date;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  slug: string;

  @Column('uuid')
  @IsUUID('4')
  user_id!: string;

  @ManyToOne(() => User, (user) => user.series)
  user!: User;

  @OneToMany(() => Series_posts, (series_posts) => series_posts.series)
  series_posts: Series_posts[];
}
