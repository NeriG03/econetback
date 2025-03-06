import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1714840000000 implements MigrationInterface {
    name = 'CreateUsersTable1714840000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`nombre\` varchar(100) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            \`password\` varchar(255) NOT NULL,
            \`rol\` enum('admin', 'usuario') NOT NULL DEFAULT 'usuario',
            \`activo\` tinyint NOT NULL DEFAULT 1,
            \`fechaCreacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`fechaActualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            UNIQUE INDEX \`IDX_usuarios_email\` (\`email\`),
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }
}