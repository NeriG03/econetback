import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1741857416317 implements MigrationInterface {
    name = ' $npmConfigName1741857416317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`manual\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`manual\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`manual\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`manual\` DROP COLUMN \`createdAt\``);
    }

}
