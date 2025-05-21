import { Activity } from 'src/activities/entities/activity.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_activities')
export class UserActivity {
  @ApiProperty({ description: 'ID único de la relación usuario-actividad', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Usuario participante en la actividad', type: () => User })
  @ManyToOne(() => User, user => user.activities)
  user: User;

  @ApiProperty({ description: 'Actividad realizada por el usuario', type: () => Activity })
  @ManyToOne(() => Activity, activity => activity.users, { eager: true })
  activity: Activity;

  @ApiProperty({ description: 'Fecha de creación de la relación' })
  @CreateDateColumn()
  createdAt: Date;
}
