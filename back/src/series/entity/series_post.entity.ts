import { IsUUID } from 'class-validator';
import { Post } from 'src/posts/entity/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Series } from './series.entity';

@Entity()
export class Series_posts {
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
  readonly order: number;

  @Column('uuid')
  @IsUUID('4')
  series_id!: string;

  //   @ApiProperty()
  @Column('uuid')
  @IsUUID('4')
  post_id!: string;

  @ManyToOne(() => Series, (series) => series.series_posts)
  @JoinColumn({ name: 'series_id' })
  series!: Series;

  @ManyToOne(() => Post, (post) => post.series_posts)
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
