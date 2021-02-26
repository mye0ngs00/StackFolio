import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  Check,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsUUID } from 'class-validator';
import { User } from 'src/users/entity/user.entity';
import { Question } from './question.entity';

@Entity()
@Unique(['user_id', 'question_id'])
@Unique(['user_id', 'question_comment_id'])
@Check(`
  COALESCE(LENGTH(question_id::text)::boolean::integer, 0)
	+
	COALESCE(LENGTH(question_comment_id::text)::boolean::integer, 0)
  = 1
`)
export class QuestionLike {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('uuid')
  @IsUUID('4')
  user_id: string;

  @Column('uuid', { nullable: true })
  @IsUUID('4')
  question_id: string;

  @Column('uuid', { nullable: true })
  @IsUUID('4')
  question_comment_id: string;

  @ManyToOne((type) => User, (user) => user.question_like, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  author: User;

  @ManyToOne((type) => Question, (question) => question.likes)
  @JoinColumn({ name: 'quesion_id' })
  question!: Question;

  //   @ManyToOne((type) => Question, (qeustion) => qeustion.likes)
  //   @JoinColumn({ name: 'quesion_id' })
  //   qeustion_comment!: Question;
}
