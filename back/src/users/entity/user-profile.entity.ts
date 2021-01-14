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
  username: string;

  @Column({ length: 255, nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  about?: string;

  @Column({ length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'jsonb', default: {} })
  social_links: SocialLinks;

  @Column('uuid')
  user_id: string;

  /** Relations */

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
