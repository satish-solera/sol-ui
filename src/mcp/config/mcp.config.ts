/**
 * MCP Server Configuration
 * Configures the Model Context Protocol server for sol-ui
 */

export interface MCPServerConfig {
  name: string;
  version: string;
  port: number;
  host: string;
  debug: boolean;
  skillsPath: string;
  maxConcurrentSkills: number;
}

const defaultConfig: MCPServerConfig = {
  name: 'sol-ui-mcp-server',
  version: '1.0.0',
  port: 3000,
  host: 'localhost',
  debug: process.env.NODE_ENV === 'development',
  skillsPath: './src/mcp/skills',
  maxConcurrentSkills: 10,
};

export function getMCPConfig(overrides?: Partial<MCPServerConfig>): MCPServerConfig {
  return {
    ...defaultConfig,
    ...overrides,
  };
}
