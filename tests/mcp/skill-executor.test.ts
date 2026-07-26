/**
 * Skill Executor Tests
 */

import { SkillExecutor } from '../../src/mcp/executor/skill-executor';
import { Skill } from '../../src/mcp/types/skill';
import { MCPContext } from '../../src/mcp/types/mcp';

describe('SkillExecutor', () => {
  let executor: SkillExecutor;

  beforeEach(() => {
    executor = new SkillExecutor();
  });

  describe('executeSkill', () => {
    it('should execute a skill successfully', async () => {
      const skill: Skill = {
        metadata: {
          id: 'test-skill',
          name: 'Test Skill',
          version: '1.0.0',
          description: 'Test',
          author: 'test',
          tags: ['test'],
          category: 'test',
        },
        input: {
          parameters: [
            {
              name: 'input',
              type: 'string',
              description: 'Test input',
              required: true,
            },
          ],
        },
        output: {
          type: 'string',
          description: 'Test output',
        },
        implementation: {
          async handler(input) {
            return `processed: ${input.input}`;
          },
        },
      };

      const context: MCPContext = {
        requestId: 'req-1',
      };

      const result = await executor.executeSkill(
        skill,
        { input: 'test' },
        context
      );

      expect(result.error).toBeUndefined();
      expect(result.result).toBe('processed: test');
    });

    it('should handle validation errors', async () => {
      const skill: Skill = {
        metadata: {
          id: 'test-skill',
          name: 'Test Skill',
          version: '1.0.0',
          description: 'Test',
          author: 'test',
          tags: ['test'],
          category: 'test',
        },
        input: {
          parameters: [
            {
              name: 'input',
              type: 'string',
              description: 'Test input',
              required: true,
            },
          ],
        },
        output: {
          type: 'string',
          description: 'Test output',
        },
        implementation: {
          async handler(input) {
            return input;
          },
          async validate() {
            return false;
          },
        },
      };

      const context: MCPContext = {
        requestId: 'req-1',
      };

      const result = await executor.executeSkill(
        skill,
        { input: 'test' },
        context
      );

      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe('VALIDATION_ERROR');
    });

    it('should handle missing required parameters', async () => {
      const skill: Skill = {
        metadata: {
          id: 'test-skill',
          name: 'Test Skill',
          version: '1.0.0',
          description: 'Test',
          author: 'test',
          tags: ['test'],
          category: 'test',
        },
        input: {
          parameters: [
            {
              name: 'required-param',
              type: 'string',
              description: 'Required',
              required: true,
            },
          ],
        },
        output: {
          type: 'string',
          description: 'Test output',
        },
        implementation: {
          async handler(input) {
            return input;
          },
        },
      };

      const context: MCPContext = {
        requestId: 'req-1',
      };

      const result = await executor.executeSkill(
        skill,
        { other: 'value' },
        context
      );

      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('Missing required parameter');
    });

    it('should handle skill execution errors', async () => {
      const skill: Skill = {
        metadata: {
          id: 'test-skill',
          name: 'Test Skill',
          version: '1.0.0',
          description: 'Test',
          author: 'test',
          tags: ['test'],
          category: 'test',
        },
        input: {
          parameters: [
            {
              name: 'input',
              type: 'string',
              description: 'Test input',
              required: true,
            },
          ],
        },
        output: {
          type: 'string',
          description: 'Test output',
        },
        implementation: {
          async handler() {
            throw new Error('Test error');
          },
        },
      };

      const context: MCPContext = {
        requestId: 'req-1',
      };

      const result = await executor.executeSkill(
        skill,
        { input: 'test' },
        context
      );

      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe('EXECUTION_ERROR');
      expect(result.error?.message).toContain('Test error');
    });
  });
});
