/**
 * MCP Protocol Type Definitions
 * Types for Model Context Protocol communication
 */

export interface MCPRequest {
  id: string;
  method: string;
  params?: Record<string, unknown>;
  timestamp: number;
}

export interface MCPResponse<T = unknown> {
  id: string;
  result?: T;
  error?: MCPError;
  timestamp: number;
}

export interface MCPError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface MCPCapabilities {
  supportsSkills: boolean;
  supportsCaching: boolean;
  supportsStreaming: boolean;
  version: string;
}

export interface MCPContext {
  requestId: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}
