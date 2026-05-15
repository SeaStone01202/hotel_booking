import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService) => ({
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'postgres'),
  database: configService.get<string>('DB_DATABASE', 'hotel_booking'),
});

export const getRedisConfig = (configService: ConfigService) => ({
  host: configService.get<string>('REDIS_HOST', 'localhost'),
  port: configService.get<number>('REDIS_PORT', 6379),
});

export const getResendConfig = (configService: ConfigService) => ({
  apiKey: configService.get<string>('RESEND_API_KEY', ''),
});

export type DatabaseConfig = ReturnType<typeof getDatabaseConfig>;
export type RedisConfig = ReturnType<typeof getRedisConfig>;
export type ResendConfig = ReturnType<typeof getResendConfig>;
