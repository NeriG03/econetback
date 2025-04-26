import { Activity } from 'src/activities/entities/activity.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_activities')
export class UserActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.activities)
  user: User;

  @ManyToOne(() => Activity, activity => activity.users, { eager: true })
  activity: Activity;

  @CreateDateColumn()
  createdAt: Date;
}
