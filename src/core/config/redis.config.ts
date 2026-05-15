import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { getRedisConfig } from './config.constants';

export const RedisProvider = {
  provide: Redis,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const { host, port } = getRedisConfig(configService);
    return new Redis(port, host, {
      retryStrategy: (times) => {
        if (times > 10) {
          return null; // stop retrying, emit error
        }
        return Math.min(times * 100, 3000); // exponential backoff max 3s
      },
      maxRetriesPerRequest: 3,
      connectTimeout: 5000,
      lazyConnect: false,
    });
  },
};
