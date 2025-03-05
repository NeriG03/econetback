import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

// Ensure environment variables are loaded
config();

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres123',  // Using the exact password we confirmed in the container
  database: 'econet_db',
  entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
});

export default dataSource;