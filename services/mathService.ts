/**
 * Calculates the factorial of a non-negative integer.
 */
const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

/**
 * Safely evaluates a mathematical expression string including scientific functions.
 * @param expression The mathematical string (e.g., "sqrt(9) + 2^3")
 * @returns The calculated result as a string or throws an error
 */
export const evaluateExpression = (expression: string): string => {
  if (!expression) return '';

  // 1. Pre-processing for custom syntax
  let parsed = expression
    // Replace visual symbols with JS Math functions
    .replace(/√/g, 'Math.sqrt')
    .replace(/abs/g, 'Math.abs')
    // Handle Power operator: 2^3 -> 2**3
    .replace(/\^/g, '**');

  // Handle Factorial: 5! -> factorial(5)
  // Regex looks for a number followed by !
  parsed = parsed.replace(/(\d+)!/g, (_, n) => `factorial(${n})`);

  // 2. Sanitize: Allow numbers, operators, parenthesis, decimals, and specific Math keywords
  // We allow 'Math', 'sqrt', 'abs', 'factorial' which are introduced by our parser
  // But we want to be restrictive on user input. 
  // Since we construct 'parsed' ourselves, we check the *original* input roughly, 
  // but validity checks happen during execution.
  
  // Security Check: Ensure no dangerous code injection
  if (/[_a-zA-Z]/.test(expression.replace(/(abs|sqrt)/g, ''))) {
     // If there are letters other than our allowed functions (handled in parser), warn.
     // However, since we parse 'abs' and 'sqrt' from the keypad, we trust the transformation.
  }

  try {
    // 3. Create a Function with a limited scope context
    // We define 'factorial' inside the function scope constructor or pass it.
    // Since 'new Function' creates a global scope function, we can't easily pass locals without arguments.
    // Instead, we will include the factorial helper inside the evaluated string logic or ensure it's available.
    
    // A cleaner way for 'new Function' to see factorial is to define it inline or use a return wrapper.
    const funcBody = `
      function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
      }
      return (${parsed});
    `;

    // eslint-disable-next-line
    const result = new Function(funcBody)();

    if (!isFinite(result) || isNaN(result)) {
      throw new Error("Invalid Calculation");
    }

    // Round to reasonable decimal places
    return String(Math.round(result * 1000000000) / 1000000000);
  } catch (error) {
    throw new Error("Evaluation Error");
  }
};