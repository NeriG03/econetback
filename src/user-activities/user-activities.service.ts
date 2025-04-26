import { Injectable } from '@nestjs/common';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { UpdateUserActivityDto } from './dto/update-user-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivity } from './entities/user-activity.entity';
import { Repository } from 'typeorm';
import { GamificationService } from 'src/gamification/gamification.service';

@Injectable()
export class UserActivitiesService {
  constructor(
    @InjectRepository(UserActivity)
    private readonly userActivityRepository: Repository<UserActivity>,
    private readonly gamificationService: GamificationService,
  ) {}

  async create(createUserActivityDto: CreateUserActivityDto) {
    const userActivity = await this.userActivityRepository.save(createUserActivityDto);

    // Otorgar puntos al usuario por completar la actividad
    await this.gamificationService.awardPointsForActivity(
      userActivity.user.id,
      userActivity.activity.id,
    );

    return userActivity;
  }

  findAll() {
    return this.userActivityRepository.find();
  }

  findOne(id: number) {
    return this.userActivityRepository.findOneBy({ id });
  }

  update(id: number, updateUserActivityDto: UpdateUserActivityDto) {
    return this.userActivityRepository.update(id, updateUserActivityDto);
  }

  remove(id: number) {
    return this.userActivityRepository.delete(id);
  }
}
