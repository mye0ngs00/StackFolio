import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { nanoid } from 'nanoid';
import { Provider } from 'src/users/entity/user.entity';

@Entity()
@Unique(['email'])
export class Register {
  /** Columns */

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column({ length: 10 })
  @IsString()
  code: string;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  @IsEnum(Provider)
  @IsOptional()
  provider?: Provider;

  @Column({ length: 255, nullable: true })
  @IsString()
  social_id?: string;

  @Column({ length: 255 })
  @IsEmail()
  email: string;

  /** Listener */

  @BeforeInsert()
  generateVerificationCode() {
    this.code = nanoid(10);
  }
}
