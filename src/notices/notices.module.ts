import { Module, OnModuleInit } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notice, User])],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
