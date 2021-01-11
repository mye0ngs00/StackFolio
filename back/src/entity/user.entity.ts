import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';

export enum Provider {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamp with time zone')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamp with time zone')
  @UpdateDateColumn()
  readonly updated_at: Date;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  provider: Provider;

  @Column({ nullable: true, length: 255 })
  social_id?: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ default: false })
  is_verified: boolean;

  @OneToMany((returns) => Post, (post) => post.user)
  posts: Post[];
}
