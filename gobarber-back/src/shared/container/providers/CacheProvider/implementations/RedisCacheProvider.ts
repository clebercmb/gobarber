import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCashProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    console.log('Conntected to Redis');
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: unknown): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }
    const dataParsed = JSON.parse(data) as T;

    return dataParsed;
  }

  public async invalidate(key: string): Promise<void> {}
}
