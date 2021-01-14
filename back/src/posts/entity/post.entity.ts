import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { PostInformation } from './post-information.entity';
import { PostMetadata } from './post-metadata.entity';
import { Comment } from '../../comments/entity/comment.entity';

@Entity()
export class Post {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  readonly updated_at: Date;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  contents: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid', { nullable: true })
  post_information_id: string;

  @Column('uuid')
  post_metadata_id: string;

  /** Relations */

  @OneToOne((type) => PostInformation, (information) => information.post, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'post_information_id', referencedColumnName: 'id' })
  information?: PostInformation;

  @OneToOne((type) => PostMetadata, (metadata) => metadata.post, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'post_metadata_id', referencedColumnName: 'id' })
  metadata: PostMetadata;

  @ManyToOne((type) => User, (user) => user.posts, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  author: User;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];
}
