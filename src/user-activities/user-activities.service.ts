import { Injectable } from '@nestjs/common';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { UpdateUserActivityDto } from './dto/update-user-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivity } from './entities/user-activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserActivitiesService {
  constructor(
    @InjectRepository(UserActivity)
    private readonly userActivityRepository: Repository<UserActivity>,
  ) {}

  create(createUserActivityDto: CreateUserActivityDto) {
    return this.userActivityRepository.save(createUserActivityDto);
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
