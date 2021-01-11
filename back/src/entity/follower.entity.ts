import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('followers')
export class Follower {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('timestamp with time zone')
  @CreateDateColumn()
  readonly created_at: Date;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  follower_id: string;
}
