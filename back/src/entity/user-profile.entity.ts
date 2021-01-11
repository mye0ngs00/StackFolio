import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamp with time zone')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamp with time zone')
  @UpdateDateColumn()
  readonly updated_at: Date;

  @Column({ unique: true, length: 255 })
  username: string;

  @Column({ nullable: true, length: 255 })
  bio?: string;

  @Column({ nullable: true, length: 255 })
  avatar?: string;

  @Column({ type: 'jsonb', default: {} })
  social_links: SocialLinks;

  @Column('uuid')
  user_id: string;

  @OneToOne((returns) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
