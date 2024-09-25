import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache, Milliseconds } from "cache-manager";

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async set(key: string, value: unknown, ttl?: Milliseconds): Promise<void> {
    return await this.cacheManager.set(key, value, ttl);
  }
  async get<T>(key: string): Promise<T | null> {
    return await this.cacheManager.get<T>(key);
  }
  async delete(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }
}
