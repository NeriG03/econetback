import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1744230782503 implements MigrationInterface {
    name = ' $npmConfigName1744230782503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`rol\` \`rol\` enum ('admin', 'usuario') NOT NULL DEFAULT 'usuario'`);
        await queryRunner.query(`ALTER TABLE \`manual\` ADD CONSTRAINT \`FK_39fe2b537dc2395e399ff1a9581\` FOREIGN KEY (\`userId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` ADD CONSTRAINT \`FK_5618ade060df353e3965b759995\` FOREIGN KEY (\`userId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` ADD CONSTRAINT \`FK_951bc5ba19ed82cbbb852dbd124\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_activities\` DROP FOREIGN KEY \`FK_951bc5ba19ed82cbbb852dbd124\``);
        await queryRunner.query(`ALTER TABLE \`user_activities\` DROP FOREIGN KEY \`FK_5618ade060df353e3965b759995\``);
        await queryRunner.query(`ALTER TABLE \`manual\` DROP FOREIGN KEY \`FK_39fe2b537dc2395e399ff1a9581\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`rol\` \`rol\` enum ('admin', 'user', 'super_user', 'super_admin') NOT NULL DEFAULT 'user'`);
    }

}
