
/**
 * Programmer Service
 * Handles base conversions and bitwise operations.
 * Supports up to 32-bit integers (standard JS bitwise limitation).
 */

export const convertBase = (val: string, fromRadix: number, toRadix: number): string => {
    try {
        const decimal = parseInt(val, fromRadix);
        if (isNaN(decimal)) return '';
        return decimal.toString(toRadix).toUpperCase();
    } catch {
        return '';
    }
};

export const bitwiseOp = (a: string, b: string, op: 'AND' | 'OR' | 'XOR' | 'NOT' | 'NAND' | 'NOR' | 'SHL' | 'SHR', radix: number): string => {
    const numA = parseInt(a, radix);
    const numB = parseInt(b, radix);

    if (isNaN(numA)) return '';
    // Unary op
    if (op === 'NOT') return (~numA).toString(radix).toUpperCase();

    if (isNaN(numB)) return '';

    let res = 0;
    switch (op) {
        case 'AND': res = numA & numB; break;
        case 'OR': res = numA | numB; break;
        case 'XOR': res = numA ^ numB; break;
        case 'NAND': res = ~(numA & numB); break;
        case 'NOR': res = ~(numA | numB); break;
        case 'SHL': res = numA << numB; break;
        case 'SHR': res = numA >> numB; break;
    }
    // Handle signed 32-bit return to unsigned view if needed, but standard JS returns signed.
    return res.toString(radix).toUpperCase();
};
