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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { User } from '../../users/entity/user.entity';
import { PostInformation } from './post-information.entity';
import { PostMetadata } from './post-metadata.entity';
import { Tag } from 'src/tags/entity/tag.entity';
import { PostComment } from './post-comment.entity';

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
  @IsString()
  title: string;

  @Column('text')
  @IsString()
  contents: string;

  @Column('uuid')
  @IsUUID('4')
  user_id: string;

  @Column('uuid')
  @IsUUID('4')
  post_information_id: string;

  @Column('uuid')
  @IsUUID('4')
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

  @OneToMany((type) => PostComment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany((type) => Tag)
  @JoinTable({
    name: 'post_tag',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @ManyToMany((type) => User, (user) => user.favorites)
  users: User[];
}
