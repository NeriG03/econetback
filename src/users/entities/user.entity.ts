import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { RolesUsuario } from '../../enums/Roles-Usuarios.enum';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true }) // Excluir campo al serializar
  password: string;

  @Column({ 
    type: 'enum',
    enum: RolesUsuario,
    default: RolesUsuario.USUARIO
  })
  rol: RolesUsuario;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
