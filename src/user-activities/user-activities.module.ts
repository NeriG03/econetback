import { Module } from '@nestjs/common';
import { UserActivitiesService } from './user-activities.service';
import { UserActivitiesController } from './user-activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivity } from './entities/user-activity.entity';
import { User } from 'src/users/entities/user.entity';
import { Activity } from 'src/activities/entities/activity.entity';
import { GamificationModule } from 'src/gamification/gamification.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivity, User, Activity]), GamificationModule],
  controllers: [UserActivitiesController],
  providers: [UserActivitiesService],
})
export class UserActivitiesModule {}
