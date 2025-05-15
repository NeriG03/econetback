import { Module, OnModuleInit } from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { ManualsController } from './manuals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manual } from './entities/manual.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manual, User])],
  controllers: [ManualsController],
  providers: [ManualsService],
})
export class ManualsModule implements OnModuleInit {
  onModuleInit() {
    console.log('ManualsModule has been initialized');
  }
}
