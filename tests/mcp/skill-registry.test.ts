/**
 * Skill Registry Tests
 */

import { SkillRegistry } from '../../src/mcp/registry/skill-registry';
import { Skill } from '../../src/mcp/types/skill';

const createTestSkill = (id: string, category: string = 'test'): Skill => ({
  metadata: {
    id,
    name: `Test Skill ${id}`,
    version: '1.0.0',
    description: 'Test skill',
    author: 'test',
    tags: ['test', 'example'],
    category,
  },
  input: {
    parameters: [],
  },
  output: {
    type: 'string',
    description: 'Test',
  },
  implementation: {
    async handler() {
      return 'test';
    },
  },
});

describe('SkillRegistry', () => {
  let registry: SkillRegistry;

  beforeEach(() => {
    registry = new SkillRegistry();
  });

  describe('registerSkill', () => {
    it('should register a skill', () => {
      const skill = createTestSkill('test-1');
      registry.registerSkill(skill);

      expect(registry.getSkill('test-1')).toBe(skill);
    });

    it('should throw error on duplicate registration', () => {
      const skill = createTestSkill('test-1');
      registry.registerSkill(skill);

      expect(() => registry.registerSkill(skill)).toThrow(
        'Skill with id test-1 is already registered'
      );
    });
  });

  describe('getSkill', () => {
    it('should return undefined for non-existent skill', () => {
      expect(registry.getSkill('non-existent')).toBeUndefined();
    });

    it('should return skill if registered', () => {
      const skill = createTestSkill('test-1');
      registry.registerSkill(skill);

      expect(registry.getSkill('test-1')).toBe(skill);
    });
  });

  describe('getAllSkills', () => {
    it('should return all registered skills', () => {
      const skill1 = createTestSkill('test-1');
      const skill2 = createTestSkill('test-2');

      registry.registerSkill(skill1);
      registry.registerSkill(skill2);

      const all = registry.getAllSkills();
      expect(all).toHaveLength(2);
      expect(all).toContain(skill1);
      expect(all).toContain(skill2);
    });
  });

  describe('getSkillsByCategory', () => {
    it('should return skills filtered by category', () => {
      const skill1 = createTestSkill('test-1', 'category-1');
      const skill2 = createTestSkill('test-2', 'category-2');
      const skill3 = createTestSkill('test-3', 'category-1');

      registry.registerSkill(skill1);
      registry.registerSkill(skill2);
      registry.registerSkill(skill3);

      const category1 = registry.getSkillsByCategory('category-1');
      expect(category1).toHaveLength(2);
      expect(category1).toContain(skill1);
      expect(category1).toContain(skill3);
    });
  });

  describe('unregisterSkill', () => {
    it('should unregister a skill', () => {
      const skill = createTestSkill('test-1');
      registry.registerSkill(skill);

      const result = registry.unregisterSkill('test-1');
      expect(result).toBe(true);
      expect(registry.getSkill('test-1')).toBeUndefined();
    });

    it('should return false when unregistering non-existent skill', () => {
      const result = registry.unregisterSkill('non-existent');
      expect(result).toBe(false);
    });
  });
});
