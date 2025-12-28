/**
 * Math Service (v1.6.0)
 * Implements a custom Tokenizer and Shunting Yard Algorithm parser.
 * Replaces the unsafe 'new Function' method.
 */

// Types
type TokenType = 'NUMBER' | 'OPERATOR' | 'FUNCTION' | 'LPAREN' | 'RPAREN';

interface Token {
  type: TokenType;
  value: string;
}

const PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
  '!': 4, // Factorial has high precedence
};

const ASSOCIATIVITY: Record<string, 'Left' | 'Right'> = {
  '+': 'Left',
  '-': 'Left',
  '*': 'Left',
  '/': 'Left',
  '^': 'Right',
  '!': 'Left',
};

// Helpers
const isNumber = (char: string) => /[0-9.]/.test(char);
const isOperator = (char: string) => /[+\-*/^!]/.test(char);
const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

/**
 * 1. TOKENIZER (Lexer)
 * Converts input string into a list of tokens.
 */
const tokenize = (expression: string): Token[] => {
  const tokens: Token[] = [];
  // Standardize input
  const stream = expression.replace(/\s+/g, '')
                           .replace(/√/g, 'sqrt')
                           .replace(/abs/g, 'abs'); 
  
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
    // Functions (sqrt, abs)
    else if (/[a-z]/.test(char)) {
      let func = char;
      while (i + 1 < stream.length && /[a-z]/.test(stream[i + 1])) {
        func += stream[++i];
      }
      if (func === 'sqrt' || func === 'abs') {
        tokens.push({ type: 'FUNCTION', value: func });
      } else {
        throw new Error('invalidFormat');
      }
    }
    // Operators & Parens
    else if (isOperator(char)) {
       // Check for Unary Minus: "-" at start, or after operator, or after '('
       if (char === '-') {
          const prev = tokens[tokens.length - 1];
          const isUnary = !prev || prev.type === 'OPERATOR' || prev.type === 'LPAREN' || prev.type === 'FUNCTION';
          if (isUnary) {
             // Treat unary minus as multiplying by -1. 
             // We push -1 (Number) and * (Operator).
             // BUT, to handle precedence correctly (e.g. -2^2 = -4), it's safer to tokenize actual negative numbers if possible,
             // or treat it as a special operator 'u-'.
             // Simplest approach for this scope: Tokenize as part of number if immediately followed by number
             if (i + 1 < stream.length && isNumber(stream[i+1])) {
                 let num = '-';
                 i++; // skip '-'
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
 * Converts Infix (3 + 4) to Postfix/RPN (3 4 +)
 */
const toRPN = (tokens: Token[]): Token[] => {
  const outputQueue: Token[] = [];
  const operatorStack: Token[] = [];

  tokens.forEach(token => {
    if (token.type === 'NUMBER') {
      outputQueue.push(token);
    } 
    else if (token.type === 'FUNCTION') {
      operatorStack.push(token);
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
        throw new Error('openParen'); // Mismatched
      }
      operatorStack.pop(); // Pop '('
      // If function preceded '(', pop it to queue
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
 * Calculates the result from Postfix notation.
 */
const evaluateRPN = (rpn: Token[]): number => {
  const stack: number[] = [];

  rpn.forEach(token => {
    if (token.type === 'NUMBER') {
      stack.push(parseFloat(token.value));
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
                if (b === 0) throw new Error('divZero');
                stack.push(a / b); 
                break;
            case '^': stack.push(Math.pow(a, b)); break;
          }
      }
    }
    else if (token.type === 'FUNCTION') {
       const a = stack.pop();
       if (a === undefined) throw new Error('invalidFormat');
       if (token.value === 'sqrt') {
           if (a < 0) throw new Error('invalidFormat'); // Real domain only
           stack.push(Math.sqrt(a));
       }
       else if (token.value === 'abs') stack.push(Math.abs(a));
    }
  });

  if (stack.length !== 1) throw new Error('invalidFormat');
  return stack[0];
};

/**
 * Main Evaluation Function
 */
export const evaluateExpression = (expression: string): string => {
  if (!expression) return '';
  
  try {
    const tokens = tokenize(expression);
    const rpn = toRPN(tokens);
    const result = evaluateRPN(rpn);

    if (!isFinite(result) || isNaN(result)) {
       // Could catch NaN here, but usually caught by logic above
       throw new Error('invalidFormat');
    }
    
    // Round to avoid floating point precision issues (e.g. 0.1+0.2)
    return String(Math.round(result * 1000000000) / 1000000000);

  } catch (error: any) {
    // Re-throw known error keys, or generic if unknown
    if (['divZero', 'invalidFormat', 'openParen'].includes(error.message)) {
        throw error;
    }
    throw new Error('invalidFormat');
  }
};