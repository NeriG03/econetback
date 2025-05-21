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
export class Notice {
  @ApiProperty({ description: 'ID único de la noticia', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Título de la noticia',
    example: 'Gran evento de reciclaje comunitario',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Descripción detallada de la noticia',
    example: 'Únete a nosotros este sábado para un evento de reciclaje en el parque central.',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'URL de la imagen asociada a la noticia',
    example: 'https://example.com/image.jpg',
  })
  @Column()
  img: string;

  @ApiProperty({ description: 'Indica si la noticia está activa', example: true, default: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({ description: 'Fecha de creación de la noticia' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización de la noticia' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Usuario que creó la noticia', type: () => User })
  @ManyToOne(() => User, user => user.notices)
  user: User;
}
