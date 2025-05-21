import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { DeepPartial } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeDto {
  @ApiProperty({ description: 'Título de la noticia', example: 'Nueva campaña de reciclaje' })
  @IsNotEmpty()
  @IsString({ message: 'El título debe ser de tipo string' })
  title: string;

  @ApiProperty({
    description: 'Descripción de la noticia',
    example: 'Participa en nuestra nueva campaña para un futuro más verde.',
  })
  @IsNotEmpty()
  @IsString({ message: 'La descripción debe ser de tipo string' })
  description: string;

  @ApiProperty({
    description: 'URL de la imagen de la noticia',
    example: 'https://ejemplo.com/imagen.jpg',
  })
  @IsNotEmpty()
  @IsString({ message: 'La imagen debe ser de tipo string' })
  img: string;

  @ApiProperty({
    description: 'Indica si la noticia está activa',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser de tipo boolean' })
  activo: boolean;

  @ApiProperty({ description: 'Usuario que crea la noticia', type: () => User })
  @IsNotEmpty()
  user: DeepPartial<User>;
}
