import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1742921205094 implements MigrationInterface {
    name = ' $npmConfigName1742921205094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`img\` varchar(255) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`rol\` enum ('admin', 'user', 'super_user', 'super_admin') NOT NULL DEFAULT 'user', \`activo\` tinyint NOT NULL DEFAULT 1, \`fechaCreacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fechaActualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`manual\` (\`id\` int NOT NULL AUTO_INCREMENT, \`planta\` varchar(255) NOT NULL, \`luz\` varchar(255) NOT NULL, \`riego\` varchar(255) NOT NULL, \`humedad\` varchar(255) NOT NULL, \`temperatura\` varchar(255) NOT NULL, \`abono\` varchar(255) NOT NULL, \`poda\` varchar(255) NOT NULL, \`trasplante\` varchar(255) NOT NULL, \`enfermedades\` varchar(255) NOT NULL, \`otros\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4656f47b58a536cb93c930b786\` (\`planta\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`rol\` \`rol\` enum ('admin', 'usuario') NOT NULL DEFAULT 'usuario'`);
        await queryRunner.query(`ALTER TABLE \`notice\` ADD CONSTRAINT \`FK_d0d4b8dac89a99634b7e1fde052\` FOREIGN KEY (\`userId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notice\` DROP FOREIGN KEY \`FK_d0d4b8dac89a99634b7e1fde052\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`rol\` \`rol\` enum ('admin', 'user', 'super_user', 'super_admin') NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`DROP INDEX \`IDX_4656f47b58a536cb93c930b786\` ON \`manual\``);
        await queryRunner.query(`DROP TABLE \`manual\``);
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`notice\``);
    }

}
