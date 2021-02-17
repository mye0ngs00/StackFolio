import { IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionLike } from './question-like.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly updated_at: Date;

  @Column('text')
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
  question_information_id: string;

  @Column('uuid')
  @IsUUID('4')
  question_metadata_id: string;

  @ManyToOne((type) => User, (user) => user.questions, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  author: User;

  @OneToMany((type) => QuestionLike, (likes) => likes.quesion_id)
  likes: QuestionLike[];
}
