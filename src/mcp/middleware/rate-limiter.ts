/**
 * Rate Limiter Middleware
 * Controls the rate of skill execution
 */

export interface RateLimitConfig {
  maxRequests: number; // Max requests allowed
  windowMs: number; // Time window in milliseconds
  keyGenerator?: (skillId: string, userId?: string) => string;
}

export interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 100,
  windowMs: 60000, // 1 minute
};

export class RateLimiter {
  private config: RateLimitConfig;
  private store: Map<string, RateLimitEntry> = new Map();

  constructor(config?: Partial<RateLimitConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Check if request is allowed
   */
  isAllowed(skillId: string, userId?: string): boolean {
    const key = this.getKey(skillId, userId);
    const now = Date.now();

    const entry = this.store.get(key);

    // No entry or window expired
    if (!entry || now > entry.resetTime) {
      this.store.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return true;
    }

    // Increment count
    entry.count++;

    // Check if limit exceeded
    if (entry.count > this.config.maxRequests) {
      return false;
    }

    return true;
  }

  /**
   * Get rate limit status
   */
  getStatus(skillId: string, userId?: string) {
    const key = this.getKey(skillId, userId);
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      return {
        remaining: this.config.maxRequests,
        reset: now + this.config.windowMs,
        exceeded: false,
      };
    }

    return {
      remaining: Math.max(0, this.config.maxRequests - entry.count),
      reset: entry.resetTime,
      exceeded: entry.count > this.config.maxRequests,
    };
  }

  /**
   * Reset rate limit for a key
   */
  reset(skillId: string, userId?: string): void {
    const key = this.getKey(skillId, userId);
    this.store.delete(key);
  }

  /**
   * Clear all rate limits
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Generate rate limit key
   */
  private getKey(skillId: string, userId?: string): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(skillId, userId);
    }

    return userId ? `${userId}:${skillId}` : skillId;
  }
}
