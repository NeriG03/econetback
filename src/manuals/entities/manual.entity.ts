import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Manual {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  planta: string;

  @Column()
  luz: string;

  @Column()
  riego: string;

  @Column()
  humedad: string;

  @Column()
  temperatura: string;

  @Column()
  abono: string;

  @Column()
  poda: string;

  @Column()
  trasplante: string;

  @Column()
  enfermedades: string;

  @Column()
  otros: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.manuals)
  user: User;
}
