import { Module, OnModuleInit } from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { ManualsController } from './manuals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manual } from './entities/manual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manual])],
  controllers: [ManualsController],
  providers: [ManualsService],
})
export class ManualsModule implements OnModuleInit {
  onModuleInit() {
    console.log('ManualsModule has been initialized');
  }
}
