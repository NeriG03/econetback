import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1744358971163 implements MigrationInterface {
    name = ' $npmConfigName1744358971163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_gamification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`points\` int NOT NULL DEFAULT '0', \`level\` int NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_4f2db3f62e0aaa6a40540e7c27\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`rol\` \`rol\` enum ('admin', 'user', 'super_user', 'super_admin') NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`user_gamification\` ADD CONSTRAINT \`FK_4f2db3f62e0aaa6a40540e7c27e\` FOREIGN KEY (\`userId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_gamification\` DROP FOREIGN KEY \`FK_4f2db3f62e0aaa6a40540e7c27e\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`rol\` \`rol\` enum ('admin', 'usuario') NOT NULL DEFAULT 'usuario'`);
        await queryRunner.query(`DROP INDEX \`REL_4f2db3f62e0aaa6a40540e7c27\` ON \`user_gamification\``);
        await queryRunner.query(`DROP TABLE \`user_gamification\``);
    }

}
