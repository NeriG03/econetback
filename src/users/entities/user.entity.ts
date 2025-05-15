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

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'enum',
    enum: RolesUsuario,
    default: RolesUsuario.USER,
  })
  rol: RolesUsuario;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @OneToMany(() => Notice, notice => notice.user, { eager: true })
  notices: Notice[];

  @OneToMany(() => Manual, manual => manual.user, { eager: true })
  manuals: Manual[];

  @OneToMany(() => UserActivity, userActivity => userActivity.user, { eager: true })
  activities: UserActivity[];

  @OneToOne(() => UserGamification, userGamification => userGamification.user)
  gamification: UserGamification;
}
