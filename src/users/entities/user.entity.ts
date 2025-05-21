import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { RolesUsuario } from '../../enums/Roles-Usuarios.enum';
import { Notice } from 'src/notices/entities/notice.entity';
import { Manual } from 'src/manuals/entities/manual.entity';
import { UserActivity } from 'src/user-activities/entities/user-activity.entity';
import { UserGamification } from 'src/gamification/entities/user-gamification.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class User {
  @ApiProperty({ description: 'ID único del usuario', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre completo del usuario', example: 'Ana García' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario (debe ser único)',
    example: 'ana.garcia@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (no se expone en respuestas)',
    example: 'securePassword123',
  })
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: RolesUsuario,
    default: RolesUsuario.USER,
  })
  @Column({
    type: 'enum',
    enum: RolesUsuario,
    default: RolesUsuario.USER,
  })
  rol: RolesUsuario;

  @ApiProperty({ description: 'Indica si el usuario está activo', example: true, default: true })
  @Column({ default: true })
  activo: boolean;

  @ApiProperty({ description: 'Fecha de creación del usuario' })
  @CreateDateColumn()
  fechaCreacion: Date;

  @ApiProperty({ description: 'Fecha de la última actualización del usuario' })
  @UpdateDateColumn()
  fechaActualizacion: Date;

  @ApiProperty({ description: 'Noticias creadas por el usuario', type: () => [Notice] })
  @OneToMany(() => Notice, notice => notice.user, { eager: true })
  notices: Notice[];

  @ApiProperty({ description: 'Manuales creados por el usuario', type: () => [Manual] })
  @OneToMany(() => Manual, manual => manual.user, { eager: true })
  manuals: Manual[];

  @ApiProperty({
    description: 'Actividades en las que participa el usuario',
    type: () => [UserActivity],
  })
  @OneToMany(() => UserActivity, userActivity => userActivity.user, { eager: true })
  activities: UserActivity[];

  @ApiProperty({ description: 'Datos de gamificación del usuario', type: () => UserGamification })
  @OneToOne(() => UserGamification, userGamification => userGamification.user)
  gamification: UserGamification;
}
