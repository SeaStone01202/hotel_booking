import Redis from 'ioredis';

export const RedisProvider = {
  provide: Redis,
  useFactory: () => {
    const host = process.env.REDIS_HOST;
    let port: string | undefined | number = process.env.REDIS_PORT;
    if (host === undefined) {
      throw new Error('REDIS_HOST is not defined in environment variables');
    }
    if (port === undefined) {
      throw new Error('REDIS_PORT is not defined in environment variables');
    }
    port = parseInt(port, 10);
    return new Redis(port, host);
  },
};
