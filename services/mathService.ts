
/**
 * Math Service (v3.2.0)
 * Implements Tokenizer & Parser with Visual Math Support.
 * Updated to support variable scopes (x, t, theta) for Visualization 2.0.
 */

import { AngleMode } from '../types';

// Types
type TokenType = 'NUMBER' | 'OPERATOR' | 'FUNCTION' | 'CONSTANT' | 'LPAREN' | 'RPAREN' | 'VARIABLE';

export interface Token {
  type: TokenType;
  value: string;
}

const PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
  '!': 4, 
};

const ASSOCIATIVITY: Record<string, 'Left' | 'Right'> = {
  '+': 'Left',
  '-': 'Left',
  '*': 'Left',
  '/': 'Left',
  '%': 'Left',
  '^': 'Right',
  '!': 'Left',
};

// --- Helpers for Normalization ---

const SUPERSCRIPTS: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁻': '-' 
};

const CONSTANTS: Record<string, number> = {
  'π': Math.PI,
  'pi': Math.PI,
  'e': Math.E
};

const normalizeExpression = (input: string): string => {
  let normalized = input
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\s+/g, '');

  // Convert Superscripts (e.g., "2³" -> "2^3")
  normalized = normalized.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/g, (match) => {
    const normalNums = match.split('').map(char => SUPERSCRIPTS[char] || char).join('');
    return `^${normalNums}`; 
  });

  // Add explicit multiplication for implicit cases like "2x", "xsin", ")("
  // 1. Number followed by Variable (2x -> 2*x)
  normalized = normalized.replace(/(\d)([a-z(])/g, '$1*$2');
  // 2. Variable followed by Number (x2 -> x*2) - less common but possible
  // 3. Close Paren followed by Open Paren, Number, or Variable ()x -> )*x
  normalized = normalized.replace(/(\))([a-z0-9(])/g, '$1*$2');

  return normalized;
};

// --- Logic Helpers ---
const isNumber = (char: string) => /[0-9.]/.test(char);
const isOperator = (char: string) => /[+\-*/^!%]/.test(char); 
const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

// Degrees to Radians
const toRad = (angle: number, mode: AngleMode) => mode === 'DEG' ? angle * (Math.PI / 180) : angle;
// Radians to Degrees
const fromRad = (angle: number, mode: AngleMode) => mode === 'DEG' ? angle * (180 / Math.PI) : angle;

/**
 * 1. TOKENIZER (Lexer)
 */
export const tokenize = (expression: string): Token[] => {
  const normalized = normalizeExpression(expression);
  // Normalize visual function names
  const stream = normalized
     .replace(/√/g, 'sqrt')
     .replace(/∛/g, 'cbrt')
     .replace(/π/g, 'pi'); 
  
  const tokens: Token[] = [];
  let i = 0;

  while (i < stream.length) {
    const char = stream[i];

    // Numbers
    if (isNumber(char)) {
      let num = char;
      while (i + 1 < stream.length && isNumber(stream[i + 1])) {
        num += stream[++i];
      }
      tokens.push({ type: 'NUMBER', value: num });
    }
    // Simple Variables (x, t)
    else if (char === 'x' || char === 't') {
       tokens.push({ type: 'VARIABLE', value: char });
    }
    // Functions & Constants & Complex Variables (theta)
    else if (/[a-z]/.test(char)) {
      let text = char;
      while (i + 1 < stream.length && /[a-z0-9]/.test(stream[i + 1])) {
        text += stream[++i];
      }
      
      // Constants
      if (text === 'pi' || text === 'e') {
          tokens.push({ type: 'CONSTANT', value: text });
      }
      // Variables
      else if (['x', 't', 'theta', 'th'].includes(text)) {
          tokens.push({ type: 'VARIABLE', value: text === 'th' ? 'theta' : text });
      }
      // Rand
      else if (text === 'rand') {
          tokens.push({ type: 'FUNCTION', value: 'rand' });
      }
      // Functions
      else if ([
          'sqrt', 'cbrt', 'abs', 
          'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 
          'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
          'log', 'ln', 'exp', 'log2'
        ].includes(text)) {
        tokens.push({ type: 'FUNCTION', value: text });
      } else {
        throw new Error('invalidFormat');
      }
    }
    // Absolute Value
    else if (char === '|') {
      const prev = tokens[tokens.length - 1];
      const isStart = !prev;
      const isPrecededByOp = prev && (prev.type === 'OPERATOR' || prev.type === 'LPAREN' || prev.type === 'FUNCTION');
      
      if (isStart || isPrecededByOp) {
        tokens.push({ type: 'FUNCTION', value: 'abs' }); 
        tokens.push({ type: 'LPAREN', value: '(' });
      } else {
        tokens.push({ type: 'RPAREN', value: ')' }); 
      }
    }
    // Operators
    else if (isOperator(char)) {
       // Unary Minus Check
       if (char === '-') {
          const prev = tokens[tokens.length - 1];
          const isUnary = !prev || prev.type === 'OPERATOR' || prev.type === 'LPAREN' || prev.type === 'FUNCTION';
          if (isUnary) {
             // Treat as negative number if followed immediately by number
             if (i + 1 < stream.length && isNumber(stream[i+1])) {
                 let num = '-';
                 i++; 
                 num += stream[i];
                 while (i + 1 < stream.length && isNumber(stream[i + 1])) {
                    num += stream[++i];
                 }
                 tokens.push({ type: 'NUMBER', value: num });
                 i++; continue; 
             }
          }
       }
       tokens.push({ type: 'OPERATOR', value: char });
    }
    else if (char === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
    }
    else if (char === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
    }
    i++;
  }
  return tokens;
};

/**
 * 2. SHUNTING YARD ALGORITHM
 */
export const toRPN = (tokens: Token[]): Token[] => {
  const outputQueue: Token[] = [];
  const operatorStack: Token[] = [];

  tokens.forEach(token => {
    if (token.type === 'NUMBER' || token.type === 'CONSTANT' || token.type === 'VARIABLE') {
      outputQueue.push(token);
    } 
    else if (token.type === 'FUNCTION') {
      if (token.value === 'rand') {
         outputQueue.push(token);
      } else {
         operatorStack.push(token);
      }
    }
    else if (token.type === 'OPERATOR') {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type !== 'LPAREN' &&
        (
            (ASSOCIATIVITY[token.value] === 'Left' && PRECEDENCE[token.value] <= PRECEDENCE[operatorStack[operatorStack.length - 1].value]) ||
            (ASSOCIATIVITY[token.value] === 'Right' && PRECEDENCE[token.value] < PRECEDENCE[operatorStack[operatorStack.length - 1].value])
        )
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    }
    else if (token.type === 'LPAREN') {
      operatorStack.push(token);
    }
    else if (token.type === 'RPAREN') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type !== 'LPAREN') {
        outputQueue.push(operatorStack.pop()!);
      }
      if (operatorStack.length === 0) {
        throw new Error('openParen'); 
      }
      operatorStack.pop(); 
      if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type === 'FUNCTION') {
        outputQueue.push(operatorStack.pop()!);
      }
    }
  });

  while (operatorStack.length > 0) {
    const op = operatorStack.pop()!;
    if (op.type === 'LPAREN') throw new Error('openParen');
    outputQueue.push(op);
  }

  return outputQueue;
};

/**
 * 3. RPN EVALUATOR
 * Optimized to accept variable map (scope) for Graphing.
 */
export const evaluateRPN = (rpn: Token[], angleMode: AngleMode, vars?: Record<string, number>): number => {
  const stack: number[] = [];

  for (let i = 0; i < rpn.length; i++) {
    const token = rpn[i];

    if (token.type === 'NUMBER') {
      stack.push(parseFloat(token.value));
    } 
    else if (token.type === 'CONSTANT') {
       stack.push(CONSTANTS[token.value] || 0);
    }
    else if (token.type === 'VARIABLE') {
       if (vars && vars[token.value] !== undefined) {
           stack.push(vars[token.value]);
       } else {
           throw new Error('invalidFormat');
       }
    }
    else if (token.type === 'OPERATOR') {
      if (token.value === '!') {
          const a = stack.pop();
          if (a === undefined) throw new Error('invalidFormat');
          stack.push(factorial(a));
      } else {
          const b = stack.pop();
          const a = stack.pop();
          if (a === undefined || b === undefined) throw new Error('invalidFormat');

          switch (token.value) {
            case '+': stack.push(a + b); break;
            case '-': stack.push(a - b); break;
            case '*': stack.push(a * b); break;
            case '/': 
                // For graphing, div by zero might happen, return NaN or Infinity allowed
                // But for calc mode we might want to throw. 
                // Let's allow Infinity for graph purposes, check caller.
                if (b === 0 && !vars) throw new Error('divZero');
                stack.push(a / b); 
                break;
            case '%': stack.push(a % b); break;
            case '^': stack.push(Math.pow(a, b)); break;
          }
      }
    }
    else if (token.type === 'FUNCTION') {
       if (token.value === 'rand') {
           stack.push(Math.random());
           continue;
       }

       const a = stack.pop();
       if (a === undefined) throw new Error('invalidFormat');
       
       switch (token.value) {
           case 'sqrt':
               if (a < 0 && !vars) throw new Error('invalidFormat'); // Allow NaN for graph
               stack.push(Math.sqrt(a));
               break;
           case 'cbrt': stack.push(Math.cbrt(a)); break;
           case 'abs': stack.push(Math.abs(a)); break;
           case 'sin': stack.push(Math.sin(toRad(a, angleMode))); break;
           case 'cos': stack.push(Math.cos(toRad(a, angleMode))); break;
           case 'tan': stack.push(Math.tan(toRad(a, angleMode))); break;
           case 'asin': stack.push(fromRad(Math.asin(a), angleMode)); break;
           case 'acos': stack.push(fromRad(Math.acos(a), angleMode)); break;
           case 'atan': stack.push(fromRad(Math.atan(a), angleMode)); break;
           case 'sinh': stack.push(Math.sinh(a)); break;
           case 'cosh': stack.push(Math.cosh(a)); break;
           case 'tanh': stack.push(Math.tanh(a)); break;
           case 'asinh': stack.push(Math.asinh(a)); break;
           case 'acosh': stack.push(Math.acosh(a)); break;
           case 'atanh': stack.push(Math.atanh(a)); break;
           case 'ln': stack.push(Math.log(a)); break;
           case 'log': stack.push(Math.log10(a)); break;
           case 'log2': stack.push(Math.log2(a)); break;
           case 'exp': stack.push(Math.exp(a)); break;
           default: throw new Error('invalidFormat');
       }
    }
  }

  if (stack.length !== 1) throw new Error('invalidFormat');
  return stack[0];
};

/**
 * Main Evaluation Function
 */
export const evaluateExpression = (expression: string, angleMode: AngleMode = 'DEG', xValue?: number): string => {
  if (!expression) return '';
  
  try {
    const tokens = tokenize(expression);
    const rpn = toRPN(tokens);
    
    // Pass xValue if present
    const result = evaluateRPN(rpn, angleMode, xValue !== undefined ? { x: xValue } : undefined);

    if (!isFinite(result) || isNaN(result)) {
       // If evaluating for X (graphing), returning NaN string is fine, caller handles it.
       // But for normal calc, we usually throw.
       if (xValue !== undefined) return 'NaN';
       throw new Error('invalidFormat');
    }
    
    // Precision handling: round to 9 decimal places
    return String(Math.round(result * 1000000000) / 1000000000);

  } catch (error: any) {
    if (['divZero', 'invalidFormat', 'openParen'].includes(error.message)) {
        throw error;
    }
    throw new Error('invalidFormat');
  }
};

/**
 * Helper to get RPN for repetitive Graphing calls
 */
export const compileExpression = (expression: string): Token[] | null => {
    try {
        const tokens = tokenize(expression);
        return toRPN(tokens);
    } catch {
        return null;
    }
};
