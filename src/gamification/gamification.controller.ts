import { Controller, Get, Param } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('gamification')
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @ApiOperation({ summary: 'Obtener estadísticas de gamificación de un usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas del usuario',
    schema: {
      properties: {
        points: { type: 'number' },
        level: { type: 'number' },
        completedActivities: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get('user/:userId')
  getUserStats(@Param('userId') userId: string) {
    return this.gamificationService.getUserStats(+userId);
  }
}
