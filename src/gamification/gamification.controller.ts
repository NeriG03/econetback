import { Controller, Get, Param } from '@nestjs/common';
import { GamificationService } from './gamification.service';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('user/:userId')
  getUserStats(@Param('userId') userId: string) {
    return this.gamificationService.getUserStats(+userId);
  }
}
