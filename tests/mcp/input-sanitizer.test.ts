/**
 * Input Sanitizer Tests
 */

import { InputSanitizer } from '../../src/mcp/security/input-sanitizer';

describe('InputSanitizer', () => {
  let sanitizer: InputSanitizer;

  beforeEach(() => {
    sanitizer = new InputSanitizer();
  });

  describe('sanitize', () => {
    it('should sanitize valid input', () => {
      const input = {
        name: 'test',
        age: 25,
        active: true,
      };

      const result = sanitizer.sanitize(input);
      expect(result).toEqual(input);
    });

    it('should throw error for non-object input', () => {
      expect(() => sanitizer.sanitize('string')).toThrow(
        'Input must be an object'
      );
      expect(() => sanitizer.sanitize(null)).toThrow(
        'Input must be an object'
      );
    });

    it('should throw error for invalid keys', () => {
      const input = {
        'invalid-key!': 'value',
      };

      expect(() => sanitizer.sanitize(input)).toThrow('Invalid key');
    });

    it('should throw error for strings exceeding max length', () => {
      const sanitizer2 = new InputSanitizer({ maxStringLength: 10 });
      const input = {
        text: 'this is a very long string that exceeds the maximum length',
      };

      expect(() => sanitizer2.sanitize(input)).toThrow(
        'exceeds maximum length'
      );
    });

    it('should throw error for invalid numbers', () => {
      const input = {
        value: Infinity,
      };

      expect(() => sanitizer.sanitize(input)).toThrow(
        'must be finite'
      );
    });

    it('should remove XSS patterns', () => {
      const input = {
        text: '<script>alert("xss")</script>Hello',
      };

      const result = sanitizer.sanitize(input);
      expect(result.text).toBe('Hello');
    });

    it('should remove event handlers', () => {
      const input = {
        html: 'Click <img onclick="alert(1)">',
      };

      const result = sanitizer.sanitize(input);
      expect(result.html).not.toContain('onclick');
    });
  });
});
