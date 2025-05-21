import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Indica si el usuario está activo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El valor de activo debe ser un booleano' })
  activo?: boolean;
}
