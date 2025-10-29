import Redis from 'ioredis';

class RedisService {
  private client: Redis | null = null;
  private isConnected = false;

  constructor() {
    if (process.env.REDIS_URL) {
      try {
        this.client = new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
          enableReadyCheck: true,
          retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
        });

        this.client.on('connect', () => {
          console.log('✅ Redis connected');
          this.isConnected = true;
        });

        this.client.on('error', (err) => {
          console.error('❌ Redis error:', err);
          this.isConnected = false;
        });
      } catch (error) {
        console.error('❌ Redis initialization failed:', error);
      }
    } else {
      console.warn('⚠️  REDIS_URL not set - caching disabled');
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client || !this.isConnected) return null;

    try {
      const data = await this.client.get(key);
      if (!data) return null;

      const parsed = JSON.parse(data);
      console.log(`💾 Cache HIT: ${key}`);
      return parsed as T;
    } catch (error) {
      console.error('❌ Redis get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number = 300): Promise<boolean> {
    if (!this.client || !this.isConnected) return false;

    try {
      await this.client.setex(key, ttlSeconds, JSON.stringify(value));
      console.log(`💾 Cache SET: ${key} (TTL: ${ttlSeconds}s)`);
      return true;
    } catch (error) {
      console.error('❌ Redis set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.client || !this.isConnected) return false;

    try {
      await this.client.del(key);
      console.log(`🗑️  Cache DELETE: ${key}`);
      return true;
    } catch (error) {
      console.error('❌ Redis delete error:', error);
      return false;
    }
  }

  async clear(pattern: string = '*'): Promise<number> {
    if (!this.client || !this.isConnected) return 0;

    try {
      const keys = await this.client.keys(pattern);
      if (keys.length === 0) return 0;

      await this.client.del(...keys);
      console.log(`🗑️  Cache CLEARED: ${keys.length} keys`);
      return keys.length;
    } catch (error) {
      console.error('❌ Redis clear error:', error);
      return 0;
    }
  }

  isReady(): boolean {
    return this.isConnected;
  }
}

export const redisService = new RedisService();