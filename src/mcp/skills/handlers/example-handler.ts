/**
 * Example Skill Handler
 * Demonstrates skill implementation pattern
 */

import { Skill } from '../../types/skill';

export const exampleSkillHandler: Skill = {
  metadata: {
    id: 'example-skill',
    name: 'Example Skill',
    version: '1.0.0',
    description: 'This is an example skill demonstrating the skill handler pattern',
    author: 'sol-ui',
    tags: ['example', 'template', 'utility'],
    category: 'utility',
  },
  input: {
    parameters: [
      {
        name: 'text',
        type: 'string',
        description: 'Input text to process',
        required: true,
      },
      {
        name: 'uppercase',
        type: 'boolean',
        description: 'Convert to uppercase',
        required: false,
        default: false,
      },
    ],
  },
  output: {
    type: 'string',
    description: 'Processed output text',
  },
  implementation: {
    async handler(input: Record<string, unknown>) {
      const text = input.text as string;
      const uppercase = (input.uppercase as boolean) || false;

      let result = text;
      if (uppercase) {
        result = result.toUpperCase();
      }

      return {
        original: text,
        processed: result,
        uppercase,
        length: result.length,
      };
    },

    async validate(input: Record<string, unknown>) {
      if (typeof input.text !== 'string' || input.text.length === 0) {
        return false;
      }
      if (input.uppercase !== undefined && typeof input.uppercase !== 'boolean') {
        return false;
      }
      return true;
    },
  },
};

/**
 * Text Analysis Skill
 */
export const textAnalysisSkill: Skill = {
  metadata: {
    id: 'text-analysis',
    name: 'Text Analysis',
    version: '1.0.0',
    description: 'Analyzes text content and returns statistics',
    author: 'sol-ui',
    tags: ['analysis', 'text', 'utility'],
    category: 'utility',
  },
  input: {
    parameters: [
      {
        name: 'text',
        type: 'string',
        description: 'Text to analyze',
        required: true,
      },
    ],
  },
  output: {
    type: 'object',
    description: 'Text analysis results',
  },
  implementation: {
    async handler(input: Record<string, unknown>) {
      const text = input.text as string;
      const words = text.split(/\s+/).filter(w => w.length > 0);
      const sentences = text.split(/[.!?]+/).filter(s => s.length > 0);
      const characters = text.length;
      const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;

      return {
        characters,
        words: words.length,
        sentences: sentences.length,
        uniqueWords,
        averageWordLength: words.length > 0 ? (characters / words.length).toFixed(2) : 0,
        averageWordsPerSentence: sentences.length > 0 ? (words.length / sentences.length).toFixed(2) : 0,
      };
    },

    async validate(input: Record<string, unknown>) {
      return typeof input.text === 'string' && input.text.length > 0;
    },
  },
};
