import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamp with time zone')
  @UpdateDateColumn()
  readonly updated_at: Date;

  @Column('timestamp with time zone')
  @UpdateDateColumn()
  readonly released_at: Date;

  @Column({ default: false })
  published: boolean;

  @Column({ default: false })
  is_private: boolean;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  body: string;

  @Column({ nullable: true, length: 255 })
  description: string;

  @Column({ nullable: true, length: 255 })
  thumbnail?: string;

  @Column({ nullable: true, length: 255 })
  slug?: string;

  @Column('uuid')
  user_id: string;

  // We can setup 'cascade' options in our relations,
  // in the cases when we want our related object to be saved whenever the other object is saved.
  // Also, 'eager' relations are loaded automatically each time you load entities from the database.
  @ManyToOne((returns) => User, (user) => user.posts, {
    cascade: true,
    eager: true,
  })
  user: User;
}
