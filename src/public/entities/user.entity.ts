// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'varchar', length: 20 })
//   email: string;

//   @Column({ type: 'varchar', length: 20 })
//   name: string;

//   @Column({ type: 'varchar', length: 50 })
//   password: string;

//   @Column({ type: 'integer' })
//   entranceYear: number;

//   @Column({ type: 'integer' })
//   grade: number;
// }

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'integer' })
  entranceYear: number;

  @Column({ type: 'integer', nullable: true })
  grade: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  deletedAt: Date;

  @OneToMany(() => Room, (room) => room.member)
  rooms: Room[];
}
