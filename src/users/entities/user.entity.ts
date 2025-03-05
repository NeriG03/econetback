import { RolesUsuarios } from "src/enums/Roles-Usuarios.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({ unique: true , nullable: false})
    email: string;

    @Column({ nullable: false})
    password: string;

    @Column({ nullable: false})
    rol: RolesUsuarios;

    @Column({ default: true ,nullable: false})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: 0 ,nullable: false})
    puntos: number;

}
