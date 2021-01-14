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

export interface SocialLinks {
  email?: string;
  github?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  homepage?: string;
}

@Entity()
@Unique(['username'])
export class UserProfile {
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
  @Length(3, 50)
  username: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  bio?: string;

  @Column('text', { nullable: true })
  @IsString()
  @IsOptional()
  about?: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  avatar?: string;

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
