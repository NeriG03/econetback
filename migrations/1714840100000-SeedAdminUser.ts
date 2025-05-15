import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class SeedAdminUser1714840100000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Hash password for admin (password: admin123)
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash('admin123', salt);

        // Insert admin user
        await queryRunner.query(`
            INSERT INTO \`usuarios\` (\`nombre\`, \`email\`, \`password\`, \`rol\`, \`activo\`)
            VALUES ('Administrador', 'admin@econet.com', ?, 'admin', 1)
        `, [hashedPassword]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove admin user
        await queryRunner.query(`DELETE FROM \`usuarios\` WHERE \`email\` = 'admin@econet.com'`);
    }
}