/**
 * Audit Logger
 * Tracks skill execution for security and debugging
 */

export interface AuditEvent {
  timestamp: number;
  skillId: string;
  userId?: string;
  action: 'EXECUTE' | 'VALIDATE' | 'ERROR';
  status: 'SUCCESS' | 'FAILURE';
  inputHash: string;
  outputHash?: string;
  duration: number;
  error?: string;
}

export interface AuditConfig {
  enableAudit: boolean;
  storageBackend?: 'memory' | 'file' | 'database';
  maxEvents?: number;
  retentionDays?: number;
}

export class AuditLogger {
  private config: AuditConfig;
  private events: AuditEvent[] = [];
  private maxEvents: number;

  constructor(config?: AuditConfig) {
    this.config = {
      enableAudit: true,
      storageBackend: 'memory',
      maxEvents: 10000,
      retentionDays: 30,
      ...config,
    };
    this.maxEvents = this.config.maxEvents || 10000;
  }

  /**
   * Log an audit event
   */
  logEvent(event: Omit<AuditEvent, 'timestamp'>): void {
    if (!this.config.enableAudit) {
      return;
    }

    const auditEvent: AuditEvent = {
      ...event,
      timestamp: Date.now(),
    };

    this.events.push(auditEvent);

    // Maintain size limit
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
  }

  /**
   * Get audit events for a skill
   */
  getEvents(
    skillId: string,
    limit: number = 100
  ): AuditEvent[] {
    return this.events
      .filter(e => e.skillId === skillId)
      .slice(-limit);
  }

  /**
   * Get audit events for a user
   */
  getEventsByUser(
    userId: string,
    limit: number = 100
  ): AuditEvent[] {
    return this.events
      .filter(e => e.userId === userId)
      .slice(-limit);
  }

  /**
   * Get all events
   */
  getAllEvents(limit: number = 1000): AuditEvent[] {
    return this.events.slice(-limit);
  }

  /**
   * Get audit statistics
   */
  getStatistics() {
    const total = this.events.length;
    const successful = this.events.filter(e => e.status === 'SUCCESS').length;
    const failed = this.events.filter(e => e.status === 'FAILURE').length;
    const avgDuration = total > 0
      ? this.events.reduce((sum, e) => sum + e.duration, 0) / total
      : 0;

    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? ((successful / total) * 100).toFixed(2) : '0.00',
      averageDuration: avgDuration.toFixed(2),
    };
  }

  /**
   * Clear all events
   */
  clearEvents(): void {
    this.events = [];
  }
}

/**
 * Hash function for input/output
 */
export function hashInput(input: Record<string, unknown>): string {
  const json = JSON.stringify(input);
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    const char = json.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}
