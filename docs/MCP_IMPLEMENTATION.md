# MCP Implementation Guide - Extended

## Complete Feature Set

This document covers the complete MCP implementation including security, caching, health monitoring, and testing.

## Security Features

### Input Sanitization

All skill inputs are automatically sanitized to prevent security vulnerabilities:

```typescript
import { InputSanitizer } from './src/mcp/security/input-sanitizer';

const sanitizer = new InputSanitizer({
  maxStringLength: 10000,
  maxArrayLength: 1000,
});

const safeInput = sanitizer.sanitize(userInput);
```

**Features:**
- XSS pattern removal
- Event handler stripping
- Type validation
- Size limit enforcement
- Deep object validation

### Audit Logging

All skill executions are logged for compliance and debugging:

```typescript
import { AuditLogger, hashInput } from './src/mcp/security/audit-logger';

const auditLogger = new AuditLogger({
  enableAudit: true,
  storageBackend: 'memory',
  maxEvents: 10000,
});

auditLogger.logEvent({
  skillId: 'my-skill',
  userId: 'user-123',
  action: 'EXECUTE',
  status: 'SUCCESS',
  inputHash: hashInput({ text: 'hello' }),
  duration: 45,
});

// Retrieve audit events
const events = auditLogger.getEvents('my-skill');
const stats = auditLogger.getStatistics();
```

## Performance Features

### Skill Caching

Cache skill definitions and execution results:

```typescript
import { SkillCache } from './src/mcp/cache/skill-cache';

const cache = new SkillCache({
  enabled: true,
  ttl: 60000, // 1 minute
  maxSize: 1000,
});

// Cache a skill
cache.set('my-skill', skillObject, 60000);

// Retrieve from cache
const skill = cache.get('my-skill');

// Get cache statistics
const stats = cache.getStats();
console.log(`Cache hit rate: ${stats.hitRate}`);
```

### Rate Limiting

Control execution frequency:

```typescript
import { RateLimiter } from './src/mcp/middleware/rate-limiter';

const limiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 60000, // 1 minute
});

if (limiter.isAllowed('my-skill', 'user-123')) {
  // Execute skill
} else {
  // Rate limit exceeded
  const status = limiter.getStatus('my-skill', 'user-123');
  console.log(`Reset at: ${new Date(status.reset).toISOString()}`);
}
```

## Monitoring & Health Checks

### Health Checker

Monitor server and skill health:

```typescript
import { HealthChecker } from './src/mcp/health/health-checker';

const healthChecker = new HealthChecker();

// Record metrics
healthChecker.updateSkillsLoaded(10);
healthChecker.updateSkillsActive(8);

// Record execution
const startTime = Date.now();
try {
  await executeSkill();
  const duration = Date.now() - startTime;
  healthChecker.recordExecution(duration, true);
} catch (error) {
  const duration = Date.now() - startTime;
  healthChecker.recordExecution(duration, false);
  healthChecker.recordError('my-skill', error.message);
}

// Get health status
const health = healthChecker.getStatus();
console.log(`Server Status: ${health.status}`);
console.log(`Success Rate: ${health.metrics.successRate}%`);
```

## Structured Logging

```typescript
import { Logger, LogLevel } from './src/mcp/utils/logger';

const logger = new Logger(LogLevel.DEBUG, true);

logger.debug('Debug message', { context: 'data' });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', error, { context: 'data' });

// Retrieve logs
const logs = logger.getLogs(50);
```

## Complete Example with All Features

```typescript
import { MCPServer, getMCPConfig } from './src/mcp';
import { InputSanitizer } from './src/mcp/security/input-sanitizer';
import { AuditLogger, hashInput } from './src/mcp/security/audit-logger';
import { SkillCache } from './src/mcp/cache/skill-cache';
import { RateLimiter } from './src/mcp/middleware/rate-limiter';
import { HealthChecker } from './src/mcp/health/health-checker';
import { Logger } from './src/mcp/utils/logger';

// Initialize components
const config = getMCPConfig({
  skillsPath: './src/mcp/skills',
  debug: true,
});

const server = new MCPServer(config);
const sanitizer = new InputSanitizer();
const auditLogger = new AuditLogger({ enableAudit: true });
const cache = new SkillCache({ ttl: 60000 });
const limiter = new RateLimiter({ maxRequests: 100 });
const healthChecker = new HealthChecker();
const logger = new Logger();

// Enhanced request handling
async function handleSkillRequest(
  skillId: string,
  input: Record<string, unknown>,
  userId?: string
) {
  const startTime = Date.now();
  const requestId = `req-${Date.now()}`;

  try {
    // Check rate limit
    if (!limiter.isAllowed(skillId, userId)) {
      logger.warn('Rate limit exceeded', { skillId, userId });
      const status = limiter.getStatus(skillId, userId);
      throw new Error(`Rate limit exceeded. Reset at ${status.reset}`);
    }

    // Sanitize input
    const sanitizedInput = sanitizer.sanitize(input);
    logger.debug('Input sanitized', { skillId });

    // Check cache
    const cacheKey = `${skillId}:${JSON.stringify(sanitizedInput)}`;
    let result = cache.get(cacheKey);

    if (result) {
      logger.info('Cache hit', { skillId, requestId });
      return result;
    }

    // Execute skill
    const request = {
      id: requestId,
      method: 'executeSkill',
      params: { skillId, input: sanitizedInput },
    };

    result = await server.handleRequest(request);

    // Cache result
    if (result.result) {
      cache.set(cacheKey, result);
    }

    // Log audit event
    const duration = Date.now() - startTime;
    auditLogger.logEvent({
      skillId,
      userId,
      action: 'EXECUTE',
      status: result.error ? 'FAILURE' : 'SUCCESS',
      inputHash: hashInput(sanitizedInput),
      duration,
    });

    // Update health metrics
    healthChecker.recordExecution(duration, !result.error);
    logger.info('Skill executed', { skillId, duration });

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMsg = error instanceof Error ? error.message : String(error);

    // Log error
    healthChecker.recordError(skillId, errorMsg);
    auditLogger.logEvent({
      skillId,
      userId,
      action: 'EXECUTE',
      status: 'FAILURE',
      inputHash: hashInput(input),
      duration,
      error: errorMsg,
    });

    logger.error('Skill execution failed', error as Error, { skillId });

    throw error;
  }
}

// Health check endpoint
function getHealthStatus() {
  return {
    server: healthChecker.getStatus(),
    cache: cache.getStats(),
    audit: auditLogger.getStatistics(),
  };
}

// Startup
async function start() {
  await server.start();
  healthChecker.updateSkillsLoaded(server.getRegistry().getAllSkills().length);
  logger.info('MCP Server started successfully');
}

// Shutdown
async function shutdown() {
  await server.stop();
  logger.info('MCP Server stopped');
}

export {
  handleSkillRequest,
  getHealthStatus,
  start,
  shutdown,
};
```

## Testing

Run tests:

```bash
# All MCP tests
npm test -- tests/mcp

# Specific test
npm test -- tests/mcp/skill-executor.test.ts
```

## Configuration Best Practices

1. **Security:**
   - Enable input sanitization in production
   - Set reasonable string/array length limits
   - Enable audit logging

2. **Performance:**
   - Enable caching with appropriate TTL
   - Set rate limits based on capacity
   - Monitor health metrics

3. **Reliability:**
   - Handle errors gracefully
   - Log all operations
   - Monitor health status

## Troubleshooting

### High Failure Rate
- Check health metrics: `healthChecker.getStatus()`
- Review audit logs: `auditLogger.getEvents('skill-id')`
- Verify input validation

### Cache Issues
- Check cache stats: `cache.getStats()`
- Verify TTL settings
- Monitor cache size

### Rate Limiting
- Adjust limits: `new RateLimiter({ maxRequests: X })`
- Check status: `limiter.getStatus('skill-id')`

## API Reference

See individual module documentation:
- `InputSanitizer` - Input validation and XSS prevention
- `AuditLogger` - Execution tracking
- `SkillCache` - Performance optimization
- `RateLimiter` - Request throttling
- `HealthChecker` - System monitoring
- `Logger` - Structured logging
