import { UserActivity } from 'src/user-activities/entities/user-activity.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  points: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @OneToMany(() => UserActivity, userActivity => userActivity.activity)
  users: UserActivity[];
}
