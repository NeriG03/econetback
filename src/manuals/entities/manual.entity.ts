import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Manual {
  @ApiProperty({ description: 'ID único del manual', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre de la planta', example: 'Rosa', uniqueItems: true })
  @Column({ unique: true })
  planta: string;

  @ApiProperty({ description: 'Condiciones de luz', example: 'Pleno sol' })
  @Column()
  luz: string;

  @ApiProperty({ description: 'Instrucciones de riego', example: 'Regar cada 3 días' })
  @Column()
  riego: string;

  @ApiProperty({ description: 'Nivel de humedad ideal', example: '60-70%' })
  @Column()
  humedad: string;

  @ApiProperty({ description: 'Temperatura ideal', example: '18-24°C' })
  @Column()
  temperatura: string;

  @ApiProperty({ description: 'Tipo de abono y frecuencia', example: 'Abono orgánico cada mes' })
  @Column()
  abono: string;

  @ApiProperty({ description: 'Instrucciones de poda', example: 'Podar en primavera' })
  @Column()
  poda: string;

  @ApiProperty({ description: 'Instrucciones de trasplante', example: 'Trasplantar cada 2 años' })
  @Column()
  trasplante: string;

  @ApiProperty({
    description: 'Enfermedades comunes y tratamiento',
    example: 'Pulgón, tratar con jabón potásico',
  })
  @Column()
  enfermedades: string;

  @ApiProperty({ description: 'Otros cuidados', example: 'Proteger de heladas' })
  @Column()
  otros: string;

  @ApiProperty({ description: 'Fecha de creación del manual' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización del manual' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Usuario que creó el manual', type: () => User })
  @ManyToOne(() => User, user => user.manuals)
  user: User;
}
