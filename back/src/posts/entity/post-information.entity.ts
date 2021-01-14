import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostInformation {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  readonly updated_at: Date;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ length: 255, nullable: true })
  thumbnail?: string;

  @Column({ length: 255, nullable: true })
  slug?: string;

  /** Relations */

  @OneToOne((type) => Post, (post) => post.information, { onDelete: 'CASCADE' })
  post: Post;
}
