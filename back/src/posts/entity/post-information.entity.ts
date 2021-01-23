import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { IsString, IsOptional } from 'class-validator';

@Entity()
export class PostInformation {
  /** Columns */

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty()
  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @ApiProperty()
  @Column('timestamptz')
  @UpdateDateColumn()
  readonly updated_at: Date;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;

  /** Relations */

  @OneToOne((type) => Post, (post) => post.information, { onDelete: 'CASCADE' })
  post: Post;
}
