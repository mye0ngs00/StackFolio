import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('verifications')
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamp with time zone')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column({ length: 255 })
  code: string;

  @Column({ length: 255 })
  email: string;
}
