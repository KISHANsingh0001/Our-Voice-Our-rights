import Redis from 'ioredis';

class RedisService {
  private client: Redis | null = null;
  private isConnected = false;
  private connectionAttempted = false;

  constructor() {
    // Skip Redis initialization during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.log('⚠️  Build phase detected - Redis initialization skipped');
      return;
    }

    // Only initialize Redis if URL is provided
    if (!process.env.REDIS_URL) {
      console.warn('⚠️  REDIS_URL not set - caching disabled');
      return;
    }

    // Don't initialize immediately, wait for first use
    console.log('✅ Redis service initialized (lazy connection)');
  }

  private async ensureConnection(): Promise<boolean> {
    // Already connected
    if (this.isConnected && this.client) {
      return true;
    }

    // Already tried and failed
    if (this.connectionAttempted && !this.client) {
      return false;
    }

    // Skip if no URL
    if (!process.env.REDIS_URL) {
      return false;
    }

    // Mark as attempted
    this.connectionAttempted = true;

    try {
      this.client = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 2,
        enableReadyCheck: false,
        connectTimeout: 5000,
        lazyConnect: false,
        retryStrategy(times) {
          if (times > 2) {
            console.warn('⚠️  Redis connection failed - will work without cache');
            return null; // Stop retrying
          }
          return Math.min(times * 100, 1000);
        },
        tls: {
          rejectUnauthorized: false,
        },
        // Prevent unhandled errors from crashing
        enableOfflineQueue: false,
      });

      // Handle events
      this.client.on('connect', () => {
        console.log('✅ Redis connected');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        console.log('✅ Redis ready');
        this.isConnected = true;
      });

      this.client.on('error', (err) => {
        // Only log once, don't spam console
        if (this.isConnected) {
          console.warn('⚠️  Redis connection lost:', err.message);
        }
        this.isConnected = false;
      });

      this.client.on('close', () => {
        this.isConnected = false;
      });

      // Wait for connection with timeout
      await Promise.race([
        new Promise((resolve) => {
          this.client?.once('ready', resolve);
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
        ),
      ]);

      return this.isConnected;
    } catch (error) {
      console.warn('⚠️  Redis unavailable - continuing without cache:', (error as Error).message);
      this.client = null;
      this.isConnected = false;
      return false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      await this.ensureConnection();
      
      if (!this.client || !this.isConnected) {
        return null;
      }

      const data = await this.client.get(key);
      if (!data) return null;

      const parsed = JSON.parse(data);
      console.log(`💾 Cache HIT: ${key}`);
      return parsed as T;
    } catch (error) {
      // Silently fail, don't spam logs
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number = 300): Promise<boolean> {
    try {
      await this.ensureConnection();
      
      if (!this.client || !this.isConnected) {
        return false;
      }

      await this.client.setex(key, ttlSeconds, JSON.stringify(value));
      console.log(`💾 Cache SET: ${key} (TTL: ${ttlSeconds}s)`);
      return true;
    } catch (error) {
      // Silently fail
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await this.ensureConnection();
      
      if (!this.client || !this.isConnected) {
        return false;
      }

      await this.client.del(key);
      console.log(`🗑️  Cache DELETE: ${key}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  async clear(pattern: string = '*'): Promise<number> {
    try {
      await this.ensureConnection();
      
      if (!this.client || !this.isConnected) {
        return 0;
      }

      const keys = await this.client.keys(pattern);
      if (keys.length === 0) return 0;

      await this.client.del(...keys);
      console.log(`🗑️  Cache CLEARED: ${keys.length} keys`);
      return keys.length;
    } catch (error) {
      return 0;
    }
  }

  isReady(): boolean {
    return this.isConnected;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      try {
        await this.client.quit();
        console.log('👋 Redis disconnected');
      } catch (error) {
        // Ignore disconnect errors
      }
    }
  }
}

export const redisService = new RedisService();