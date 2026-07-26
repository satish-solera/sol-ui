/**
 * MCP Module Exports
 * Main entry point for the MCP implementation
 */

// Configuration
export { MCPServerConfig, getMCPConfig } from './config/mcp.config';

// Types
export type {
  Skill,
  SkillMetadata,
  SkillParameter,
  SkillInput,
  SkillOutput,
  SkillImplementation,
  SkillManifest,
} from './types/skill';

export type {
  MCPRequest,
  MCPResponse,
  MCPError,
  MCPCapabilities,
  MCPContext,
} from './types/mcp';

// Core classes
export { SkillLoader } from './loader/skill-loader';
export { SkillExecutor } from './executor/skill-executor';
export { SkillRegistry } from './registry/skill-registry';
export { MCPServer } from './server/mcp-server';
