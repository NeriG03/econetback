import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { DeepPartial } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManualDto {
  @ApiProperty({ description: 'Nombre de la planta', example: 'Rosa' })
  @IsNotEmpty()
  @IsString()
  planta: string;

  @ApiProperty({ description: 'Condiciones de luz', example: 'Pleno sol' })
  @IsNotEmpty()
  @IsString()
  luz: string;

  @ApiProperty({ description: 'Instrucciones de riego', example: 'Regar cada 3 días' })
  @IsNotEmpty()
  @IsString()
  riego: string;

  @ApiProperty({ description: 'Nivel de humedad ideal', example: '60-70%' })
  @IsNotEmpty()
  @IsString()
  humedad: string;

  @ApiProperty({ description: 'Temperatura ideal', example: '18-24°C' })
  @IsNotEmpty()
  @IsString()
  temperatura: string;

  @ApiProperty({ description: 'Tipo de abono y frecuencia', example: 'Abono orgánico cada mes' })
  @IsNotEmpty()
  @IsString()
  abono: string;

  @ApiProperty({ description: 'Instrucciones de poda', example: 'Podar en primavera' })
  @IsNotEmpty()
  @IsString()
  poda: string;

  @ApiProperty({ description: 'Instrucciones de trasplante', example: 'Trasplantar cada 2 años' })
  @IsNotEmpty()
  @IsString()
  trasplante: string;

  @ApiProperty({
    description: 'Enfermedades comunes y tratamiento',
    example: 'Pulgón, tratar con jabón potásico',
  })
  @IsNotEmpty()
  @IsString()
  enfermedades: string;

  @ApiProperty({ description: 'Otros cuidados', example: 'Proteger de heladas' })
  @IsNotEmpty()
  @IsString()
  otros: string;

  @ApiProperty({ description: 'Usuario que crea el manual', type: () => User })
  @IsNotEmpty()
  user: DeepPartial<User>;
}
