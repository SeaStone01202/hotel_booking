import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config.constants';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const db = getDatabaseConfig(configService);
  return {
    type: 'postgres',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/core/database/migrations/**/*.js'],
    migrationsTableName: 'migrations',
    synchronize: false,
    logging: false,
  };
};
