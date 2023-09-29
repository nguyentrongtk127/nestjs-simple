import { CacheModule, CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { APP_CONFIG } from 'src/config';
import { CacheRepository } from './cache.repository';
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: APP_CONFIG.REDIS_HOST,
      port: APP_CONFIG.REDIS_PORT,
      password: APP_CONFIG.REDIS_PASS,
      ttl: 3600,
    }),
  ],
  providers: [CacheRepository],
  exports: [CacheRepository],
})
export class DatabaseModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager) {
    const client = cacheManager.store.getClient();

    client.on('error', (error) => {
      console.error(error);
    });
  }
}
