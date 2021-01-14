import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostMetadata {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @UpdateDateColumn()
  published_at: Date;

  @Column({ default: false })
  published: boolean;

  @Column({ default: false })
  is_private: boolean;

  /** Relations */

  @OneToOne((type) => Post, (post) => post.metadata, { onDelete: 'CASCADE' })
  post: Post;
}
