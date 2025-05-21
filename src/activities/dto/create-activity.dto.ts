import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty({
    description: 'Título de la actividad',
    example: 'Reciclaje de plásticos',
  })
  @IsNotEmpty({ message: 'El campo title es requerido' })
  @IsString({ message: 'El campo title debe ser un string' })
  title: string;

  @ApiProperty({
    description: 'Descripción de la actividad',
    example: 'Consiste en recolectar y separar plásticos para su reciclaje.',
  })
  @IsNotEmpty({ message: 'El campo description es requerido' })
  @IsString({ message: 'El campo description debe ser un string' })
  description: string;

  @ApiProperty({
    description: 'Fecha de inicio de la actividad',
    example: '2024-07-20T10:00:00.000Z',
    type: Date,
  })
  @IsNotEmpty({ message: 'El campo startDate es requerido' })
  @IsDate({ message: 'El campo startDate debe ser una fecha' })
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de fin de la actividad',
    example: '2024-07-27T10:00:00.000Z',
    type: Date,
  })
  @IsNotEmpty({ message: 'El campo endDate es requerido' })
  @IsDate({ message: 'El campo endDate debe ser una fecha' })
  endDate: Date;

  @ApiProperty({
    description: 'Puntos otorgados por completar la actividad',
    example: 100,
  })
  @IsNotEmpty({ message: 'El campo points es requerido' })
  @IsNumber({}, { message: 'El campo points debe ser un número' })
  points: number;

  @ApiProperty({
    description: 'Indica si la actividad está activa',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser un booleano' })
  activo: boolean;
}
