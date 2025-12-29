import { describe, it, expect } from 'vitest';
import { evaluateExpression } from './mathService';

describe('Math Service Engine', () => {
  
  it('should handle basic arithmetic', () => {
    expect(evaluateExpression('2+2')).toBe('4');
    expect(evaluateExpression('10-5')).toBe('5');
    expect(evaluateExpression('3*5')).toBe('15');
    expect(evaluateExpression('10/2')).toBe('5');
  });

  it('should handle visual operators', () => {
    expect(evaluateExpression('2×5')).toBe('10'); // Visual multiply
    expect(evaluateExpression('10÷2')).toBe('5'); // Visual divide
  });

  it('should respect order of operations (PEMDAS)', () => {
    expect(evaluateExpression('2+3×4')).toBe('14'); // Not 20
    expect(evaluateExpression('(2+3)×4')).toBe('20');
  });

  it('should handle exponents (Superscripts & Operator)', () => {
    expect(evaluateExpression('2^3')).toBe('8');
    expect(evaluateExpression('2³')).toBe('8'); // Visual superscript
    expect(evaluateExpression('5²')).toBe('25');
  });

  it('should handle absolute value pipes', () => {
    expect(evaluateExpression('|-5|')).toBe('5');
    expect(evaluateExpression('|3-10|')).toBe('7');
    expect(evaluateExpression('2+|-5|')).toBe('7');
  });

  it('should handle factorials', () => {
    expect(evaluateExpression('5!')).toBe('120');
    expect(evaluateExpression('3!')).toBe('6');
    expect(evaluateExpression('0!')).toBe('1');
  });

  it('should handle square roots', () => {
    expect(evaluateExpression('√9')).toBe('3');
    expect(evaluateExpression('√16+5')).toBe('9'); // sqrt(16) + 5
    expect(evaluateExpression('√(16+9)')).toBe('5'); // sqrt(25)
  });

  it('should handle complex expressions', () => {
    // 5 + 3 * 2^2 = 5 + 3 * 4 = 5 + 12 = 17
    expect(evaluateExpression('5+3×2²')).toBe('17');
    
    // |-10| / 2 = 5
    expect(evaluateExpression('|-10|÷2')).toBe('5');
  });

  it('should throw correct errors', () => {
    expect(() => evaluateExpression('5÷0')).toThrow('divZero');
    expect(() => evaluateExpression('√-1')).toThrow('invalidFormat');
    expect(() => evaluateExpression('(5+2')).toThrow('openParen');
    expect(() => evaluateExpression('|+5')).toThrow('openParen'); // Unclosed pipe
  });
});