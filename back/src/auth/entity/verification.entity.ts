import { User } from 'src/users/entity/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { nanoid } from 'nanoid';

@Entity()
export class Verification {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column({ length: 255 })
  @IsString()
  code: string;

  @Column('uuid')
  @IsUUID('4')
  user_id: string;

  /** Relations */

  @OneToOne((type) => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  /** Listeners */

  @BeforeInsert()
  generateVerificationCode() {
    this.code = this.user.email + '-' + nanoid(10);
  }
}
