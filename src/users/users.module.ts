import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Notice } from 'src/notices/entities/notice.entity';
import { Manual } from 'src/manuals/entities/manual.entity';
import { UserActivity } from 'src/user-activities/entities/user-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notice, Manual, UserActivity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
