/**
 * Input Sanitizer
 * Provides security validation and sanitization for skill inputs
 */

export interface SanitizationOptions {
  maxStringLength?: number;
  maxArrayLength?: number;
  allowedTypes?: string[];
  customValidators?: Record<string, (value: unknown) => boolean>;
}

const DEFAULT_OPTIONS: SanitizationOptions = {
  maxStringLength: 10000,
  maxArrayLength: 1000,
  allowedTypes: ['string', 'number', 'boolean', 'object', 'array'],
};

export class InputSanitizer {
  private options: SanitizationOptions;

  constructor(options?: SanitizationOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * Sanitize input object
   */
  sanitize(input: unknown): Record<string, unknown> {
    if (typeof input !== 'object' || input === null) {
      throw new Error('Input must be an object');
    }

    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(input)) {
      // Validate key
      if (!this.isValidKey(key)) {
        throw new Error(`Invalid key: ${key}`);
      }

      // Sanitize value
      sanitized[key] = this.sanitizeValue(value, key);
    }

    return sanitized;
  }

  /**
   * Sanitize a single value
   */
  private sanitizeValue(value: unknown, key: string): unknown {
    if (value === null || value === undefined) {
      return value;
    }

    const type = typeof value;

    if (type === 'string') {
      return this.sanitizeString(value as string, key);
    }

    if (type === 'number') {
      return this.sanitizeNumber(value as number, key);
    }

    if (type === 'boolean') {
      return value;
    }

    if (Array.isArray(value)) {
      return this.sanitizeArray(value, key);
    }

    if (type === 'object') {
      return this.sanitizeObject(value as Record<string, unknown>, key);
    }

    throw new Error(`Invalid type for key ${key}: ${type}`);
  }

  /**
   * Sanitize string value
   */
  private sanitizeString(str: string, key: string): string {
    const maxLength = this.options.maxStringLength || 10000;

    if (str.length > maxLength) {
      throw new Error(
        `String value for key ${key} exceeds maximum length of ${maxLength}`
      );
    }

    // Remove potential XSS patterns
    return this.removeXSSPatterns(str);
  }

  /**
   * Sanitize number value
   */
  private sanitizeNumber(num: number, key: string): number {
    if (!Number.isFinite(num)) {
      throw new Error(`Invalid number for key ${key}: must be finite`);
    }
    return num;
  }

  /**
   * Sanitize array value
   */
  private sanitizeArray(arr: unknown[], key: string): unknown[] {
    const maxLength = this.options.maxArrayLength || 1000;

    if (arr.length > maxLength) {
      throw new Error(
        `Array value for key ${key} exceeds maximum length of ${maxLength}`
      );
    }

    return arr.map((item, index) => this.sanitizeValue(item, `${key}[${index}]`));
  }

  /**
   * Sanitize nested object
   */
  private sanitizeObject(
    obj: Record<string, unknown>,
    parentKey: string
  ): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (!this.isValidKey(key)) {
        throw new Error(`Invalid nested key ${parentKey}.${key}`);
      }
      sanitized[key] = this.sanitizeValue(value, `${parentKey}.${key}`);
    }

    return sanitized;
  }

  /**
   * Validate key format
   */
  private isValidKey(key: string): boolean {
    // Only allow alphanumeric, underscore, and dash
    return /^[a-zA-Z0-9_-]+$/.test(key);
  }

  /**
   * Remove potential XSS patterns
   */
  private removeXSSPatterns(str: string): string {
    // Remove script tags and event handlers
    let sanitized = str
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/on\w+\s*=\s*[^\s>]*/gi, '');

    return sanitized;
  }
}
