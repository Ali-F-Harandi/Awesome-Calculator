/**
 * Solver Service
 * Handles algebraic equation solving logic.
 */

// Format numbers nicely
const fmt = (n: number) => {
    return parseFloat(n.toFixed(6));
};

// --- ALGEBRA ---

export const solveLinear = (a: number, b: number, c: number): number | null => {
    // ax + b = c  =>  ax = c - b  =>  x = (c - b) / a
    if (a === 0) return null; // No solution or infinite if c==b
    return fmt((c - b) / a);
};

export interface QuadraticResult {
    roots: number[];
    discriminant: number;
    hasComplex?: boolean;
}

export const solveQuadratic = (a: number, b: number, c: number): QuadraticResult => {
    if (a === 0) return { roots: [], discriminant: 0 }; // Not quadratic

    const delta = b * b - 4 * a * c;
    
    if (delta > 0) {
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        return { roots: [fmt(x1), fmt(x2)], discriminant: fmt(delta) };
    } else if (delta === 0) {
        const x = -b / (2 * a);
        return { roots: [fmt(x)], discriminant: 0 };
    } else {
        return { roots: [], discriminant: fmt(delta), hasComplex: true };
    }
};

// Simplified Cubic Solver (Real roots mainly)
export const solveCubic = (a: number, b: number, c: number, d: number): number[] => {
    if (a === 0) return []; 
    // Cardano's method placeholder
    return []; 
};

export interface SystemResult {
    x?: number;
    y?: number;
    z?: number;
    status: 'unique' | 'infinite' | 'none';
}

export const solveSystem2 = (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): SystemResult => {
    // a1x + b1y = c1
    // a2x + b2y = c2
    
    const D = a1 * b2 - a2 * b1;
    const Dx = c1 * b2 - c2 * b1;
    const Dy = a1 * c2 - a2 * c1;

    if (D === 0) {
        return (Dx === 0 && Dy === 0) ? { status: 'infinite' } : { status: 'none' };
    }

    return {
        x: fmt(Dx / D),
        y: fmt(Dy / D),
        status: 'unique'
    };
};

export const solveSystem3 = (
    a1: number, b1: number, c1: number, d1: number,
    a2: number, b2: number, c2: number, d2: number,
    a3: number, b3: number, c3: number, d3: number
): SystemResult => {
    // Cramer's Rule for 3x3
    
    const det = (m11:number, m12:number, m13:number, m21:number, m22:number, m23:number, m31:number, m32:number, m33:number) => {
        return m11 * (m22 * m33 - m23 * m32) - 
               m12 * (m21 * m33 - m23 * m31) + 
               m13 * (m21 * m32 - m22 * m31);
    };

    const D = det(a1, b1, c1, a2, b2, c2, a3, b3, c3);
    const Dx = det(d1, b1, c1, d2, b2, c2, d3, b3, c3);
    const Dy = det(a1, d1, c1, a2, d2, c2, a3, d3, c3);
    const Dz = det(a1, b1, d1, a2, b2, d2, a3, b3, d3);

    if (D === 0) {
        return (Dx === 0 && Dy === 0 && Dz === 0) ? { status: 'infinite' } : { status: 'none' };
    }

    return {
        x: fmt(Dx / D),
        y: fmt(Dy / D),
        z: fmt(Dz / D),
        status: 'unique'
    };
};

// --- GEOMETRY ---
export const solvePythagoras = (a: number | null, b: number | null, c: number | null): number | null => {
    // a^2 + b^2 = c^2
    // Missing one value required
    if (a && b && !c) return fmt(Math.sqrt(a*a + b*b));
    if (a && c && !b) return c > a ? fmt(Math.sqrt(c*c - a*a)) : null;
    if (b && c && !a) return c > b ? fmt(Math.sqrt(c*c - b*b)) : null;
    return null;
};

// --- PHYSICS ---
export const solveOhmsLaw = (v: number | null, i: number | null, r: number | null): number | null => {
    // V = I * R
    if (i && r && !v) return fmt(i * r); // Solve V
    if (v && r && !i) return fmt(v / r); // Solve I
    if (v && i && !r) return fmt(v / i); // Solve R
    return null;
};