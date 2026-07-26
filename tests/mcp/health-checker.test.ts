/**
 * Health Checker Tests
 */

import { HealthChecker } from '../../src/mcp/health/health-checker';

describe('HealthChecker', () => {
  let checker: HealthChecker;

  beforeEach(() => {
    checker = new HealthChecker();
  });

  describe('getStatus', () => {
    it('should return healthy status by default', () => {
      const status = checker.getStatus();
      expect(status.status).toBe('healthy');
      expect(status.metrics.successRate).toBe(100);
    });

    it('should return degraded status when success rate is low', () => {
      checker.updateSkillsLoaded(5);
      checker.updateSkillsActive(3);

      // Record some failures
      for (let i = 0; i < 10; i++) {
        checker.recordExecution(10, i < 5);
      }

      const status = checker.getStatus();
      expect(status.status).toBe('degraded');
    });

    it('should return unhealthy status when success rate is very low', () => {
      // Record mostly failures
      for (let i = 0; i < 100; i++) {
        checker.recordExecution(10, i < 30); // 30% success
      }

      const status = checker.getStatus();
      expect(status.status).toBe('unhealthy');
    });
  });

  describe('recordExecution', () => {
    it('should track execution metrics', () => {
      checker.recordExecution(100, true);
      checker.recordExecution(200, true);
      checker.recordExecution(150, false);

      const status = checker.getStatus();
      expect(status.metrics.totalExecutions).toBe(3);
      expect(status.metrics.failedExecutions).toBe(1);
      expect(status.metrics.averageExecutionTime).toBe(150);
    });
  });

  describe('recordError', () => {
    it('should track skill errors', () => {
      checker.recordError('skill-1', 'Error message');
      checker.recordError('skill-1', 'Another error');
      checker.recordError('skill-2', 'Different error');

      const status = checker.getStatus();
      expect(status.errors).toHaveLength(2);
      expect(status.errors[0].skillId).toBe('skill-1');
      expect(status.errors[0].count).toBe(2);
    });
  });
});
