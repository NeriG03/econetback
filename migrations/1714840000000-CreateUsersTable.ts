import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1714840000000 implements MigrationInterface {
    name = 'CreateUsersTable1714840000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear el tipo enum para los roles de usuario
        await queryRunner.query(`CREATE TYPE "public"."usuarios_rol_enum" AS ENUM('admin', 'usuario')`);
        
        // Crear la tabla de usuarios
        await queryRunner.query(`CREATE TABLE "usuarios" (
            "id" SERIAL NOT NULL, 
            "nombre" character varying(100) NOT NULL, 
            "email" character varying NOT NULL, 
            "password" character varying NOT NULL, 
            "rol" "public"."usuarios_rol_enum" NOT NULL DEFAULT 'usuario', 
            "activo" boolean NOT NULL DEFAULT true, 
            "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(), 
            "fechaActualizacion" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "UQ_usuarios_email" UNIQUE ("email"), 
            CONSTRAINT "PK_usuarios_id" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar la tabla de usuarios
        await queryRunner.query(`DROP TABLE "usuarios"`);
        
        // Eliminar el tipo enum
        await queryRunner.query(`DROP TYPE "public"."usuarios_rol_enum"`);
    }
}