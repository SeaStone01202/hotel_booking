import { DataSource } from 'typeorm';

// Standalone DataSource for TypeORM CLI (migration:generate, migration:run)
// Uses process.env directly because ConfigService is not available in CLI context
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'hotel_booking',
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/core/database/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
});
export default AppDataSource;
