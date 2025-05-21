import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Activity } from 'src/activities/entities/activity.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateUserActivityDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  userId: User;

  @ApiProperty({
    description: 'ID de la actividad',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID de la actividad es requerido' })
  @IsNumber({}, { message: 'El ID de la actividad debe ser un número' })
  activityId: Activity;
}
