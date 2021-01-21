import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import {
  IsString,
  IsOptional,
  Length,
  IsObject,
  IsUUID,
} from 'class-validator';

export class SocialLinks {
  @ApiProperty({ required: false })
  email?: string;
  @ApiProperty({ required: false })
  github?: string;
  @ApiProperty({ required: false })
  linkedIn?: string;
  @ApiProperty({ required: false })
  twitter?: string;
  @ApiProperty({ required: false })
  facebook?: string;
  @ApiProperty({ required: false })
  homepage?: string;
}

@Entity()
@Unique(['username'])
export class UserProfile {
  /** Columns */

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  readonly updated_at: Date;

  @ApiProperty()
  @Column({ length: 255 })
  @IsString()
  @Length(3, 50)
  username: string;

  @ApiProperty({ required: false })
  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ required: false })
  @Column('text', { nullable: true })
  @IsString()
  @IsOptional()
  about?: string;

  @ApiProperty({ required: false })
  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'jsonb', default: {} })
  @IsObject()
  @IsOptional()
  social_links?: SocialLinks;

  @Column('uuid')
  @IsUUID('4')
  user_id: string;

  /** Relations */

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
