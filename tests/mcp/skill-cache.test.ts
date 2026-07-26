/**
 * Skill Cache Tests
 */

import { SkillCache } from '../../src/mcp/cache/skill-cache';

describe('SkillCache', () => {
  let cache: SkillCache<string>;

  beforeEach(() => {
    cache = new SkillCache({ ttl: 1000, maxSize: 10 });
  });

  describe('get/set', () => {
    it('should cache and retrieve values', () => {
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');
    });

    it('should return null for non-existent keys', () => {
      expect(cache.get('non-existent')).toBeNull();
    });

    it('should track cache hits', () => {
      cache.set('key1', 'value1');
      cache.get('key1');
      cache.get('key1');
      cache.get('non-existent');

      const stats = cache.getStats();
      expect(stats.hits).toBe(2);
      expect(stats.misses).toBe(1);
    });
  });

  describe('expiration', () => {
    it('should expire cached values after TTL', async () => {
      cache.set('key1', 'value1', 100);
      expect(cache.get('key1')).toBe('value1');

      await new Promise(resolve => setTimeout(resolve, 150));
      expect(cache.get('key1')).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete cached values', () => {
      cache.set('key1', 'value1');
      cache.delete('key1');
      expect(cache.get('key1')).toBeNull();
    });
  });

  describe('clear', () => {
    it('should clear all cached values', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.clear();

      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
    });
  });

  describe('size limit', () => {
    it('should respect max size', () => {
      const smallCache = new SkillCache({ maxSize: 3 });

      smallCache.set('key1', 'value1');
      smallCache.set('key2', 'value2');
      smallCache.set('key3', 'value3');
      smallCache.set('key4', 'value4');

      const stats = smallCache.getStats();
      expect(stats.size).toBeLessThanOrEqual(3);
    });
  });
});
