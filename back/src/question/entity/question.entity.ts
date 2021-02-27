import { IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionComment } from './question-comment.entity';
import { QuestionInformation } from './question-information.entity';
import { QuestionLike } from './question-like.entity';
import { QuestionMetadata } from './question-metadata.entity';

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

  @OneToOne(
    (type) => QuestionInformation,
    (information) => information.question,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn({ name: 'question_information_id', referencedColumnName: 'id' })
  information?: QuestionInformation;

  @OneToOne((type) => QuestionMetadata, (metadata) => metadata.question, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'question_metadata_id', referencedColumnName: 'id' })
  metadata: QuestionMetadata;

  @ManyToOne((type) => User, (user) => user.questions, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  author: User;

  @OneToMany((type) => QuestionLike, (likes) => likes.question_id)
  likes: QuestionLike[];

  @OneToMany((type)=> QuestionComment, (comments)=>comments.question )
  comments: Comment[]
}
