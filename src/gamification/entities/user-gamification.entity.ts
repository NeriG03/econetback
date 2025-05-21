import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_gamification')
export class UserGamification {
  @ApiProperty({ description: 'ID único del registro de gamificación', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Usuario asociado', type: () => User })
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ApiProperty({ description: 'Puntos acumulados por el usuario', example: 1500, default: 0 })
  @Column({ default: 0 })
  points: number;

  @ApiProperty({ description: 'Nivel actual del usuario', example: 5, default: 1 })
  @Column({ default: 1 })
  level: number;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización del registro' })
  @UpdateDateColumn()
  updatedAt: Date;
}
