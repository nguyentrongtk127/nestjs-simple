import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setKey(key: string, item: string, expiresIn = 3600) {
    if (!this.cacheManager.store.getClient().connected) {
      return false;
    }
    await this.cacheManager.set(key, item, {
      ttl: expiresIn,
    });
  }

  async getKey(key: string) {
    if (!this.cacheManager.store.getClient().connected) {
      return false;
    }
    const value = await this.cacheManager.get(key);
    return value;
  }
}
