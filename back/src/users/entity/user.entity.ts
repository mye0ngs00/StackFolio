import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  Check,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsBoolean,
} from 'class-validator';

import { Post } from '../../posts/entity/post.entity';
import { UserProfile } from './user-profile.entity';
import { PostComment } from 'src/posts/entity/post-comment.entity';
import { Favorite } from './user-favorite.entity';

export enum Provider {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

@Entity()
@Unique(['email'])
@Check(`
  COALESCE((provider = 'local')::integer, 0) 
  + 
  COALESCE(LENGTH(social_id::text)::boolean::integer, 0)
  = 1
`)
export class User {
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
  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  @IsEnum(Provider)
  @IsOptional()
  provider: Provider;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  @IsString()
  social_id?: string;

  @ApiProperty()
  @Column({ length: 255 })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  is_verified: boolean;

  /** Relations */

  @ManyToMany((type) => User, (user) => user.following, { cascade: true })
  @JoinTable({
    name: 'follow',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' },
  })
  followers: User[];

  @ManyToMany((type) => User, (user) => user.followers)
  following: User[];

  //   @ManyToMany((type) => Post, { cascade: true })
  //   @JoinTable({
  //     name: 'favorite',
  //     joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //     inverseJoinColumn: { name: 'post_id', referencedColumnName: 'id' },
  //   })
  //   favorites: Post[];

  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];

  @OneToMany((type) => PostComment, (comment) => comment.user)
  comments: Comment[];

  @ApiProperty()
  @OneToOne((type) => UserProfile, (userProfile) => userProfile.user, {
    cascade: true,
    eager: true,
  })
  profile: UserProfile;

  @OneToMany((type) => Favorite, (favorites) => favorites.user, {
    cascade: true,
  })
  favorites!: Favorite[];
}
