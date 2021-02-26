import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { IsBoolean, IsOptional } from 'class-validator';
import { Question } from './question.entity';

@Entity()
export class QuestionMetadata {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @UpdateDateColumn()
  published_at: Date;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  published: boolean;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  is_private: boolean;

  /** Relations */

  @OneToOne((type) => Question, (question) => question.metadata, {
    onDelete: 'CASCADE',
  })
  question: Question;
}
