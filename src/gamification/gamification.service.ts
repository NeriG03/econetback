import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGamification } from './entities/user-gamification.entity';
import { Activity } from 'src/activities/entities/activity.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(UserGamification)
    private userGamificationRepository: Repository<UserGamification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async getOrCreateUserGamification(userId: number): Promise<UserGamification> {
    let userGamification = await this.userGamificationRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!userGamification) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      userGamification = this.userGamificationRepository.create({
        user: user!,
        points: 0,
        level: 1,
      });
      await this.userGamificationRepository.save(userGamification);
    }

    return userGamification;
  }

  async addPoints(userId: number, points: number): Promise<UserGamification> {
    const userGamification = await this.getOrCreateUserGamification(userId);
    userGamification.points += points;

    // Calcular nivel basado en puntos
    // Fórmula simple: cada 100 puntos = 1 nivel
    userGamification.level = Math.floor(userGamification.points / 100) + 1;

    return this.userGamificationRepository.save(userGamification);
  }

  async awardPointsForActivity(userId: number, activityId: number): Promise<UserGamification> {
    const activity = await this.activityRepository.findOne({ where: { id: activityId } });

    if (!activity) {
      throw new Error('Actividad no encontrada');
    }

    return this.addPoints(userId, activity.points);
  }

  async getUserStats(userId: number) {
    const userGamification = await this.getOrCreateUserGamification(userId);

    return {
      points: userGamification.points,
      level: userGamification.level,
      // Puntos necesarios para el siguiente nivel
      nextLevelPoints: userGamification.level * 100 - userGamification.points,
    };
  }
}
