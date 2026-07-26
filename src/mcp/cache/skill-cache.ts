/**
 * Skill Cache
 * Caches skill definitions and execution results for performance
 */

export interface CacheConfig {
  enabled: boolean;
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of cached items
}

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

const DEFAULT_CONFIG: CacheConfig = {
  enabled: true,
  ttl: 60000, // 1 minute
  maxSize: 1000,
};

export class SkillCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private config: CacheConfig;
  private hits: number = 0;
  private misses: number = 0;

  constructor(config?: CacheConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Get value from cache
   */
  get(key: string): T | null {
    if (!this.config.enabled) {
      return null;
    }

    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    this.hits++;
    return entry.value;
  }

  /**
   * Set value in cache
   */
  set(key: string, value: T, ttl?: number): void {
    if (!this.config.enabled) {
      return;
    }

    // Check size limit
    if (this.cache.size >= (this.config.maxSize || 1000)) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.config.ttl || 60000,
    });
  }

  /**
   * Delete value from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? ((this.hits / total) * 100).toFixed(2) : '0.00';

    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: `${hitRate}%`,
      total,
    };
  }

  /**
   * Reset statistics
   */
  resetStats(): void {
    this.hits = 0;
    this.misses = 0;
  }
}
