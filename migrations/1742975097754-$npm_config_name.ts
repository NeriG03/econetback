import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1742975097754 implements MigrationInterface {
  name = ' $npmConfigName1742975097754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if notice table exists before creating it
    const noticeTableExists = await queryRunner.hasTable('notice');
    if (!noticeTableExists) {
      await queryRunner.query(
        `CREATE TABLE \`notice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`img\` varchar(255) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
    }
    // Check if manual table exists before creating it
    const manualTableExists = await queryRunner.hasTable('manual');
    if (!manualTableExists) {
      await queryRunner.query(
        `CREATE TABLE \`manual\` (\`id\` int NOT NULL AUTO_INCREMENT, \`planta\` varchar(255) NOT NULL, \`luz\` varchar(255) NOT NULL, \`riego\` varchar(255) NOT NULL, \`humedad\` varchar(255) NOT NULL, \`temperatura\` varchar(255) NOT NULL, \`abono\` varchar(255) NOT NULL, \`poda\` varchar(255) NOT NULL, \`trasplante\` varchar(255) NOT NULL, \`enfermedades\` varchar(255) NOT NULL, \`otros\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4656f47b58a536cb93c930b786\` (\`planta\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
    }

    // Check if activity table exists before creating it
    const activityTableExists = await queryRunner.hasTable('activity');
    if (!activityTableExists) {
      await queryRunner.query(
        `CREATE TABLE \`activity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`points\` int NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
    }

    try {
      // Try to add email index to usuarios table
      /* await queryRunner.query(
        `ALTER TABLE \`usuarios\` ADD UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`)`,
      ); */
    } catch (error) {
      // Index might already exist, continue with migration
    }

    // Update rol enum in usuarios table
    await queryRunner.query(
      `ALTER TABLE \`usuarios\` CHANGE \`rol\` \`rol\` enum ('admin', 'user', 'super_user', 'super_admin') NOT NULL DEFAULT 'user'`,
    );

    try {
      // Try to add foreign key to notice table
      await queryRunner.query(
        `ALTER TABLE \`notice\` ADD CONSTRAINT \`FK_d0d4b8dac89a99634b7e1fde052\` FOREIGN KEY (\`userId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    } catch (error) {
      // Foreign key might already exist, continue with migration
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Safely drop foreign key
    try {
      await queryRunner.query(
        `ALTER TABLE \`notice\` DROP FOREIGN KEY \`FK_d0d4b8dac89a99634b7e1fde052\``,
      );
    } catch (error) {
      // Foreign key might not exist
    }

    // Safely drop indices
    try {
      await queryRunner.query(
        `ALTER TABLE \`usuarios\` DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\``,
      );
    } catch (error) {
      // Index might not exist
    }

    // Revert rol enum
    await queryRunner.query(
      `ALTER TABLE \`usuarios\` CHANGE \`rol\` \`rol\` enum ('admin', 'usuario') NOT NULL DEFAULT 'usuario'`,
    );

    // Drop tables if they exist
    if (await queryRunner.hasTable('activity')) {
      await queryRunner.query(`DROP TABLE \`activity\``);
    }

    if (await queryRunner.hasTable('manual')) {
      try {
        await queryRunner.query(`DROP INDEX \`IDX_4656f47b58a536cb93c930b786\` ON \`manual\``);
      } catch (error) {
        // Index might not exist
      }
      await queryRunner.query(`DROP TABLE \`manual\``);
    }

    if (await queryRunner.hasTable('notice')) {
      await queryRunner.query(`DROP TABLE \`notice\``);
    }

    // Recreate original email index
    try {
      await queryRunner.query(
        `CREATE UNIQUE INDEX \`IDX_usuarios_email\` ON \`usuarios\` (\`email\`)`,
      );
    } catch (error) {
      // Index might already exist
    }
  }
}
