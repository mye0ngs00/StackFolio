import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Post } from './post.entity';
import { IsBoolean, IsOptional } from 'class-validator';

@Entity()
export class PostMetadata {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @UpdateDateColumn()
  published_at: Date;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  published: boolean;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  is_private: boolean;

  /** Relations */

  @OneToOne((type) => Post, (post) => post.metadata, { onDelete: 'CASCADE' })
  post: Post;
}
