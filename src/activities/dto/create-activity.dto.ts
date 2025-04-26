import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty({ message: 'El campo title es requerido' })
  @IsString({ message: 'El campo title debe ser un string' })
  title: string;

  @IsNotEmpty({ message: 'El campo description es requerido' })
  @IsString({ message: 'El campo description debe ser un string' })
  description: string;

  @IsNotEmpty({ message: 'El campo startDate es requerido' })
  @IsDate({ message: 'El campo startDate debe ser una fecha' })
  startDate: Date;

  @IsNotEmpty({ message: 'El campo endDate es requerido' })
  @IsDate({ message: 'El campo endDate debe ser una fecha' })
  endDate: Date;

  @IsNotEmpty({ message: 'El campo points es requerido' })
  @IsNumber({}, { message: 'El campo points debe ser un número' })
  points: number;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser un booleano' })
  activo: boolean;
}
