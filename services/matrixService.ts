
export type Matrix = number[][];

export const createMatrix = (rows: number, cols: number, initial = 0): Matrix => {
    return Array(rows).fill(0).map(() => Array(cols).fill(initial));
};

export const addMatrices = (A: Matrix, B: Matrix): Matrix | null => {
    if (A.length !== B.length || A[0].length !== B[0].length) return null;
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
};

export const subtractMatrices = (A: Matrix, B: Matrix): Matrix | null => {
    if (A.length !== B.length || A[0].length !== B[0].length) return null;
    return A.map((row, i) => row.map((val, j) => val - B[i][j]));
};

export const multiplyMatrices = (A: Matrix, B: Matrix): Matrix | null => {
    if (A[0].length !== B.length) return null; // Cols A must equal Rows B
    const result = createMatrix(A.length, B[0].length);
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
};

export const transposeMatrix = (A: Matrix): Matrix => {
    return A[0].map((_, colIndex) => A.map(row => row[colIndex]));
};

export const determinantMatrix = (M: Matrix): number | null => {
    if (M.length !== M[0].length) return null; // Must be square
    const n = M.length;
    if (n === 1) return M[0][0];
    if (n === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
    
    // For n > 2, using Laplace Expansion (simple recursive)
    // Note: Not efficient for large matrices (O(n!)), but fine for calculators (<=5x5)
    let det = 0;
    for (let c = 0; c < n; c++) {
        det += Math.pow(-1, c) * M[0][c] * (determinantMatrix(getMinor(M, 0, c)) || 0);
    }
    return det;
};

const getMinor = (M: Matrix, rowToRemove: number, colToRemove: number): Matrix => {
    return M.filter((_, r) => r !== rowToRemove).map(row => row.filter((_, c) => c !== colToRemove));
};

export const inverseMatrix = (M: Matrix): Matrix | null => {
    const det = determinantMatrix(M);
    if (det === null || det === 0) return null;
    
    const n = M.length;
    if (n === 1) return [[1 / M[0][0]]];
    
    // Adjugate Matrix
    const adj = createMatrix(n, n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const minor = getMinor(M, i, j);
            const factor = Math.pow(-1, i + j) * (determinantMatrix(minor) || 0);
            adj[j][i] = factor; // Transpose happened here by swapping indices
        }
    }
    
    // Multiply by 1/det
    return adj.map(row => row.map(val => Number((val / det).toFixed(6))));
};

// Helper for UI to format numbers
export const formatMatrix = (M: Matrix): string => {
    return M.map(row => row.map(n => Number(n.toFixed(4))).join('\t')).join('\n');
};
