
export const parseStatsInput = (input: string): number[] => {
    return input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
};

export const calculateStats = (data: number[]) => {
    if (data.length === 0) return null;
    
    const n = data.length;
    const sorted = [...data].sort((a, b) => a - b);
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    
    // Median
    let median = 0;
    if (n % 2 === 0) {
        median = (sorted[n/2 - 1] + sorted[n/2]) / 2;
    } else {
        median = sorted[Math.floor(n/2)];
    }
    
    // Mode
    const counts: Record<number, number> = {};
    data.forEach(x => counts[x] = (counts[x] || 0) + 1);
    let maxFreq = 0;
    let modes: number[] = [];
    for (const k in counts) {
        if (counts[k] > maxFreq) {
            maxFreq = counts[k];
            modes = [parseFloat(k)];
        } else if (counts[k] === maxFreq) {
            modes.push(parseFloat(k));
        }
    }
    if (modes.length === n) modes = []; // No mode if all unique
    
    // Variance & Std Dev (Population)
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    return {
        sum,
        count: n,
        min: sorted[0],
        max: sorted[n-1],
        mean,
        median,
        mode: modes.join(', ') || 'None',
        variance,
        stdDev
    };
};
