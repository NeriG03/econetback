import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { DeepPartial } from 'typeorm';

export class CreateManualDto {
  @IsNotEmpty()
  @IsString()
  planta: string;

  @IsNotEmpty()
  @IsString()
  luz: string;

  @IsNotEmpty()
  @IsString()
  riego: string;

  @IsNotEmpty()
  @IsString()
  humedad: string;

  @IsNotEmpty()
  @IsString()
  temperatura: string;

  @IsNotEmpty()
  @IsString()
  abono: string;

  @IsNotEmpty()
  @IsString()
  poda: string;

  @IsNotEmpty()
  @IsString()
  trasplante: string;

  @IsNotEmpty()
  @IsString()
  enfermedades: string;

  @IsNotEmpty()
  @IsString()
  otros: string;

  @IsNotEmpty()
  user: DeepPartial<User>;
}
