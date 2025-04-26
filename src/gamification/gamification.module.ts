import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificationService } from './gamification.service';
import { UserGamification } from './entities/user-gamification.entity';
import { User } from 'src/users/entities/user.entity';
import { Activity } from 'src/activities/entities/activity.entity';
import { GamificationController } from './gamification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserGamification, User, Activity])],
  providers: [GamificationService],
  controllers: [GamificationController],
  exports: [GamificationService],
})
export class GamificationModule {}
