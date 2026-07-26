/**
 * Skill Executor
 * Executes skills with input validation and error handling
 */

import { Skill } from '../types/skill';
import { MCPContext, MCPResponse, MCPError } from '../types/mcp';

export class SkillExecutor {
  /**
   * Execute a skill with the given input
   */
  async executeSkill(
    skill: Skill,
    input: Record<string, unknown>,
    context: MCPContext
  ): Promise<MCPResponse<unknown>> {
    const startTime = Date.now();
    
    try {
      // Validate input
      const validationResult = await this.validateInput(skill, input);
      if (!validationResult.valid) {
        return {
          id: context.requestId,
          error: {
            code: 'VALIDATION_ERROR',
            message: validationResult.error || 'Input validation failed',
          },
          timestamp: Date.now(),
        };
      }

      // Execute the skill handler
      const result = await skill.implementation.handler(input);
      
      return {
        id: context.requestId,
        result,
        timestamp: Date.now(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        id: context.requestId,
        error: {
          code: 'EXECUTION_ERROR',
          message: errorMessage,
        },
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Validate input against skill parameters
   */
  private async validateInput(
    skill: Skill,
    input: Record<string, unknown>
  ): Promise<{ valid: boolean; error?: string }> {
    // Use skill's custom validator if available
    if (skill.implementation.validate) {
      try {
        const isValid = await skill.implementation.validate(input);
        if (!isValid) {
          return { valid: false, error: 'Custom validation failed' };
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Validation error';
        return { valid: false, error: message };
      }
    }

    // Validate required parameters
    for (const param of skill.input.parameters) {
      if (param.required && !(param.name in input)) {
        return {
          valid: false,
          error: `Missing required parameter: ${param.name}`,
        };
      }

      if (param.name in input) {
        const value = input[param.name];
        if (typeof value !== param.type && value !== null && value !== undefined) {
          return {
            valid: false,
            error: `Parameter ${param.name} has invalid type. Expected ${param.type}, got ${typeof value}`,
          };
        }
      }
    }

    return { valid: true };
  }
}
