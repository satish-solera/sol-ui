# Model Context Protocol (MCP) Implementation Guide

## Overview

This guide covers the Model Context Protocol (MCP) implementation in sol-ui, which enables modular skill-based functionality.

## Architecture

The MCP implementation consists of several key components:

### 1. Configuration (`src/mcp/config/`)
- **mcp.config.ts**: Server configuration and setup

### 2. Type Definitions (`src/mcp/types/`)
- **skill.ts**: Skill interface and metadata definitions
- **mcp.ts**: MCP protocol types and interfaces

### 3. Skills Management (`src/mcp/skills/`)
- Directory for storing skill definition files (JSON format)
- Example skill file provided as template

### 4. Loader (`src/mcp/loader/`)
- **skill-loader.ts**: Loads and parses skill files from disk

### 5. Executor (`src/mcp/executor/`)
- **skill-executor.ts**: Executes skills with input validation

### 6. Registry (`src/mcp/registry/`)
- **skill-registry.ts**: Manages skill registration and discovery

### 7. Server (`src/mcp/server/`)
- **mcp-server.ts**: Main MCP server implementation

## Creating a Skill

### Step 1: Create Skill Definition File

Create a JSON file in `src/mcp/skills/` with the following structure:

```json
{
  "metadata": {
    "id": "unique-skill-id",
    "name": "Skill Name",
    "version": "1.0.0",
    "description": "What this skill does",
    "author": "Your Name",
    "tags": ["tag1", "tag2"],
    "category": "category-name"
  },
  "input": {
    "parameters": [
      {
        "name": "paramName",
        "type": "string",
        "description": "Parameter description",
        "required": true
      }
    ]
  },
  "output": {
    "type": "string",
    "description": "Output description"
  }
}
```

### Step 2: Implement Skill Handler

Create a TypeScript file in `src/mcp/skills/handlers/` for your skill implementation:

```typescript
import { Skill } from '../types/skill';

export const mySkill: Skill = {
  metadata: {
    id: 'my-skill',
    name: 'My Skill',
    version: '1.0.0',
    description: 'Does something useful',
    author: 'Your Name',
    tags: ['example'],
    category: 'utility',
  },
  input: {
    parameters: [
      {
        name: 'input',
        type: 'string',
        description: 'Input text',
        required: true,
      },
    ],
  },
  output: {
    type: 'string',
    description: 'Output text',
  },
  implementation: {
    async handler(input: Record<string, unknown>) {
      const text = input.input as string;
      // Implement your logic here
      return `Processed: ${text}`;
    },
    async validate(input: Record<string, unknown>) {
      return typeof input.input === 'string' && input.input.length > 0;
    },
  },
};
```

## Using the MCP Server

### Initialization

```typescript
import { MCPServer, getMCPConfig } from './mcp';

const config = getMCPConfig({
  skillsPath: './src/mcp/skills',
});

const server = new MCPServer(config);
await server.start();
```

### Executing Skills

```typescript
const request = {
  id: 'req-1',
  method: 'executeSkill',
  params: {
    skillId: 'my-skill',
    input: { input: 'hello world' },
  },
};

const response = await server.handleRequest(request);
console.log(response.result);
```

### Listing Skills

```typescript
const listRequest = {
  id: 'req-2',
  method: 'listSkills',
};

const skills = await server.handleRequest(listRequest);
console.log(skills.result); // Array of skill metadata
```

## File Structure

```
src/mcp/
├── config/
│   └── mcp.config.ts
├── types/
│   ├── skill.ts
│   └── mcp.ts
├── skills/
│   ├── example-skill.json
│   └── handlers/
│       └── (skill implementations)
├── loader/
│   └── skill-loader.ts
├── executor/
│   └── skill-executor.ts
├── registry/
│   └── skill-registry.ts
├── server/
│   └── mcp-server.ts
└── index.ts
```

## Best Practices

1. **Skill IDs**: Use kebab-case for skill IDs (e.g., `text-processor`)
2. **Categories**: Group related skills with meaningful categories
3. **Tags**: Use multiple tags for better discoverability
4. **Validation**: Implement custom validators for complex input validation
5. **Error Handling**: Always handle errors gracefully in skill handlers
6. **Documentation**: Document parameter types and expected outputs
7. **Versioning**: Follow semantic versioning for skill versions

## Testing

See `tests/mcp/` directory for testing examples.

## Support

For issues or questions, please refer to the project's issue tracker.
