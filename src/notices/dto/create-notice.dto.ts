import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { DeepPartial } from 'typeorm';

export class CreateNoticeDto {
  @IsNotEmpty()
  @IsString({ message: 'El título debe ser de tipo string' })
  title: string;

  @IsNotEmpty()
  @IsString({ message: 'La descripción debe ser de tipo string' })
  description: string;

  @IsNotEmpty()
  @IsString({ message: 'La imagen debe ser de tipo string' })
  img: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser de tipo boolean' })
  activo: boolean;

  @IsNotEmpty()
  user: DeepPartial<User>;
}
