import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Room {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  deletedAt: Date;

  @ManyToOne(() => User, (owner) => owner.rooms)
  member: User;
}
