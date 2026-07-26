/**
 * MCP Server
 * Main Model Context Protocol server for sol-ui
 */

import { MCPServerConfig } from '../config/mcp.config';
import { SkillLoader } from '../loader/skill-loader';
import { SkillExecutor } from '../executor/skill-executor';
import { SkillRegistry } from '../registry/skill-registry';
import { MCPRequest, MCPResponse, MCPContext } from '../types/mcp';

export class MCPServer {
  private config: MCPServerConfig;
  private skillLoader: SkillLoader;
  private skillExecutor: SkillExecutor;
  private skillRegistry: SkillRegistry;
  private isRunning: boolean = false;

  constructor(config: MCPServerConfig) {
    this.config = config;
    this.skillLoader = new SkillLoader(config.skillsPath);
    this.skillExecutor = new SkillExecutor();
    this.skillRegistry = new SkillRegistry();
  }

  /**
   * Initialize the MCP server
   */
  async initialize(): Promise<void> {
    try {
      if (this.config.debug) {
        console.log(`[MCP] Initializing ${this.config.name}...`);
      }

      // Load all skills
      const skills = await this.skillLoader.loadAllSkills();
      
      // Register skills
      for (const skill of skills) {
        this.skillRegistry.registerSkill(skill);
      }

      if (this.config.debug) {
        console.log(`[MCP] Loaded ${skills.length} skills`);
      }
    } catch (error) {
      console.error('[MCP] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Start the MCP server
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      throw new Error('Server is already running');
    }

    await this.initialize();
    this.isRunning = true;

    if (this.config.debug) {
      console.log(
        `[MCP] Server started on ${this.config.host}:${this.config.port}`
      );
    }
  }

  /**
   * Stop the MCP server
   */
  async stop(): Promise<void> {
    if (!this.isRunning) {
      throw new Error('Server is not running');
    }

    this.isRunning = false;

    if (this.config.debug) {
      console.log('[MCP] Server stopped');
    }
  }

  /**
   * Handle an MCP request
   */
  async handleRequest(request: MCPRequest): Promise<MCPResponse<unknown>> {
    const context: MCPContext = {
      requestId: request.id,
      metadata: {
        method: request.method,
      },
    };

    if (request.method === 'listSkills') {
      return {
        id: request.id,
        result: this.skillRegistry.getAllSkills().map(s => s.metadata),
        timestamp: Date.now(),
      };
    }

    if (request.method === 'executeSkill') {
      const { skillId, input } = (request.params || {}) as {
        skillId: string;
        input: Record<string, unknown>;
      };

      if (!skillId || !input) {
        return {
          id: request.id,
          error: {
            code: 'INVALID_PARAMS',
            message: 'skillId and input are required',
          },
          timestamp: Date.now(),
        };
      }

      const skill = this.skillRegistry.getSkill(skillId);
      if (!skill) {
        return {
          id: request.id,
          error: {
            code: 'SKILL_NOT_FOUND',
            message: `Skill ${skillId} not found`,
          },
          timestamp: Date.now(),
        };
      }

      return this.skillExecutor.executeSkill(skill, input, context);
    }

    return {
      id: request.id,
      error: {
        code: 'METHOD_NOT_FOUND',
        message: `Method ${request.method} not found`,
      },
      timestamp: Date.now(),
    };
  }

  /**
   * Check if server is running
   */
  isServerRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Get server configuration
   */
  getConfig(): MCPServerConfig {
    return this.config;
  }

  /**
   * Get skill registry
   */
  getRegistry(): SkillRegistry {
    return this.skillRegistry;
  }
}
