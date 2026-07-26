/**
 * Health Checker
 * Monitors MCP server health and skill status
 */

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: number;
  uptime: number;
  skillsLoaded: number;
  skillsActive: number;
  errors: HealthError[];
  metrics: HealthMetrics;
}

export interface HealthError {
  skillId: string;
  error: string;
  count: number;
  lastOccurred: number;
}

export interface HealthMetrics {
  averageExecutionTime: number;
  successRate: number;
  totalExecutions: number;
  failedExecutions: number;
  cacheHitRate: number;
}

export class HealthChecker {
  private startTime: number;
  private skillsLoaded: number = 0;
  private skillsActive: number = 0;
  private errorTracker: Map<string, HealthError> = new Map();
  private executionMetrics = {
    totalTime: 0,
    totalExecutions: 0,
    failedExecutions: 0,
  };

  constructor() {
    this.startTime = Date.now();
  }

  /**
   * Update health status
   */
  updateSkillsLoaded(count: number): void {
    this.skillsLoaded = count;
  }

  /**
   * Update active skills
   */
  updateSkillsActive(count: number): void {
    this.skillsActive = count;
  }

  /**
   * Record skill execution
   */
  recordExecution(duration: number, success: boolean): void {
    this.executionMetrics.totalTime += duration;
    this.executionMetrics.totalExecutions++;

    if (!success) {
      this.executionMetrics.failedExecutions++;
    }
  }

  /**
   * Record skill error
   */
  recordError(skillId: string, error: string): void {
    const existing = this.errorTracker.get(skillId);

    if (existing) {
      existing.count++;
      existing.lastOccurred = Date.now();
    } else {
      this.errorTracker.set(skillId, {
        skillId,
        error,
        count: 1,
        lastOccurred: Date.now(),
      });
    }
  }

  /**
   * Get health status
   */
  getStatus(): HealthStatus {
    const uptime = Date.now() - this.startTime;
    const errors = Array.from(this.errorTracker.values());
    const totalExecutions = this.executionMetrics.totalExecutions;
    const failedExecutions = this.executionMetrics.failedExecutions;
    const successRate =
      totalExecutions > 0 ? ((totalExecutions - failedExecutions) / totalExecutions) * 100 : 100;
    const averageExecutionTime =
      totalExecutions > 0 ? this.executionMetrics.totalTime / totalExecutions : 0;

    const status = this.determineStatus(errors, successRate);

    return {
      status,
      timestamp: Date.now(),
      uptime,
      skillsLoaded: this.skillsLoaded,
      skillsActive: this.skillsActive,
      errors,
      metrics: {
        averageExecutionTime,
        successRate,
        totalExecutions,
        failedExecutions,
        cacheHitRate: 0, // Would be populated from cache stats
      },
    };
  }

  /**
   * Determine overall health status
   */
  private determineStatus(errors: HealthError[], successRate: number): 'healthy' | 'degraded' | 'unhealthy' {
    if (successRate < 50) {
      return 'unhealthy';
    }

    if (successRate < 90 || errors.length > 5) {
      return 'degraded';
    }

    return 'healthy';
  }

  /**
   * Reset metrics
   */
  reset(): void {
    this.errorTracker.clear();
    this.executionMetrics = {
      totalTime: 0,
      totalExecutions: 0,
      failedExecutions: 0,
    };
  }
}
