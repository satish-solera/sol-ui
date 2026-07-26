/**
 * Skill Type Definitions
 * Defines the structure and interface for sol-ui skills
 */

export interface SkillParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required: boolean;
  default?: unknown;
}

export interface SkillMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  tags: string[];
  category: string;
  deprecated?: boolean;
  deprecationMessage?: string;
}

export interface SkillInput {
  parameters: SkillParameter[];
}

export interface SkillOutput {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
}

export interface SkillImplementation {
  handler: (input: Record<string, unknown>) => Promise<unknown>;
  validate?: (input: Record<string, unknown>) => boolean | Promise<boolean>;
}

export interface Skill {
  metadata: SkillMetadata;
  input: SkillInput;
  output: SkillOutput;
  implementation: SkillImplementation;
}

export interface SkillManifest {
  version: string;
  skills: Skill[];
}
