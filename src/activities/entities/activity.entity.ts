import { UserActivity } from 'src/user-activities/entities/user-activity.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Activity {
  @ApiProperty({
    description: 'ID único de la actividad',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Título de la actividad',
    example: 'Reciclaje de PET',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Descripción detallada de la actividad',
    example: 'Consiste en recolectar botellas de PET para su posterior reciclaje.',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Fecha de inicio de la actividad',
    example: '2024-07-20T10:00:00.000Z',
    type: Date,
  })
  @Column()
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de fin de la actividad',
    example: '2024-07-27T10:00:00.000Z',
    type: Date,
  })
  @Column()
  endDate: Date;

  @ApiProperty({
    description: 'Puntos que otorga la actividad',
    example: 50,
  })
  @Column()
  points: number;

  @ApiProperty({
    description: 'Indica si la actividad está activa o no',
    example: true,
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({
    description: 'Relación con las actividades de usuario',
    type: () => [UserActivity],
  })
  @OneToMany(() => UserActivity, userActivity => userActivity.activity)
  users: UserActivity[];
}
