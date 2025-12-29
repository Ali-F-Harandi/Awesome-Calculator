

import { IKeypadButton } from '../types';

// --- CENTRAL VERSION CONTROL ---
// Change the version here, and it updates everywhere in the app (Header & Footer).
export const APP_VERSION = '3.6.0.0';
// -------------------------------

export const KEYPAD_LAYOUT: IKeypadButton[] = [
  // Memory Row
  { label: 'MC', value: 'mc', type: 'memory', className: 'text-sm font-bold text-gray-500' },
  { label: 'MR', value: 'mr', type: 'memory', className: 'text-sm font-bold text-gray-500' },
  { label: 'M+', value: 'm+', type: 'memory', className: 'text-sm font-bold text-gray-500' },
  { label: 'M-', value: 'm-', type: 'memory', className: 'text-sm font-bold text-gray-500' },

  // Scientific Row
  { label: '√', value: '√(', type: 'scientific' },
  { label: 'xⁿ', value: 'pow', type: 'scientific' }, // Value 'pow' triggers exponent mode
  { label: 'x!', value: '!', type: 'scientific' },
  { label: '|x|', value: 'abs', type: 'scientific' }, // Value 'abs' triggers visual pipe wrapping

  // Standard Rows
  { label: 'C', value: 'clear', type: 'action', className: 'text-red-500 font-bold' },
  { label: '(', value: '(', type: 'scientific' },
  { label: ')', value: ')', type: 'scientific' },
  { label: '÷', value: '/', type: 'operator' }, 
  
  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },
  { label: '×', value: '*', type: 'operator' }, 
  
  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },
  { label: '-', value: '-', type: 'operator' },
  
  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },
  { label: '+', value: '+', type: 'operator' },
  
  { label: '0', value: '0', type: 'number', className: 'col-span-1' },
  { label: '.', value: '.', type: 'number' },
  { label: '⌫', value: 'backspace', type: 'action' },
  { label: '=', value: '=', type: 'action', className: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600' },
];

export const SCIENTIFIC_LAYOUT_OLD: IKeypadButton[] = []; 

// FINAL COMPREHENSIVE SCIENTIFIC LAYOUT (v2.5.0)
// Includes Hyperbolic, Cube Roots, 10^x, Rand
export const COMPREHENSIVE_SCIENTIFIC_LAYOUT: IKeypadButton[] = [
    // R1: Trig & Hyp
    { label: 'sin', value: 'sin(', type: 'scientific', className: 'text-xs' },
    { label: 'cos', value: 'cos(', type: 'scientific', className: 'text-xs' },
    { label: 'tan', value: 'tan(', type: 'scientific', className: 'text-xs' },
    { label: 'sinh', value: 'sinh(', type: 'scientific', className: 'text-xs font-mono text-gray-500' },
    { label: 'cosh', value: 'cosh(', type: 'scientific', className: 'text-xs font-mono text-gray-500' },

    // R2: Hyp (cont) & Clear
    { label: 'tanh', value: 'tanh(', type: 'scientific', className: 'text-xs font-mono text-gray-500' },
    { label: 'Rand', value: 'rand', type: 'scientific', className: 'text-xs font-bold' },
    { label: 'AC', value: 'clear', type: 'action', className: 'text-red-500 font-bold' },
    { label: '(', value: '(', type: 'scientific' },
    { label: ')', value: ')', type: 'scientific' },

    // R3: Logs & Exp
    { label: 'ln', value: 'ln(', type: 'scientific' },
    { label: 'log', value: 'log(', type: 'scientific' },
    { label: '10˟', value: 'pow', type: 'scientific' }, // UI trick: user taps, we handle logic or just use 10^
    { label: 'eˣ', value: 'exp(', type: 'scientific' },
    { label: '÷', value: '/', type: 'operator' },

    // R4: Powers & Roots
    { label: 'x²', value: 'pow', type: 'scientific' },
    { label: 'x³', value: 'pow', type: 'scientific' },
    { label: 'xⁿ', value: 'pow', type: 'scientific' },
    { label: '√', value: '√(', type: 'scientific' },
    { label: '∛', value: 'cbrt(', type: 'scientific' },

    // R5: Numpad 7-9
    { label: 'x!', value: '!', type: 'scientific' },
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: '×', value: '*', type: 'operator' },

    // R6: Numpad 4-6
    { label: '1/x', value: 'pow', type: 'scientific' },
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '-', value: '-', type: 'operator' },

    // R7: Numpad 1-3
    { label: 'π', value: 'π', type: 'scientific' },
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '+', value: '+', type: 'operator' },

    // R8: Inverse Trig & Bottom
    { label: 'e', value: 'e', type: 'scientific' },
    { label: '|x|', value: 'abs', type: 'scientific' },
    { label: '0', value: '0', type: 'number' },
    { label: '.', value: '.', type: 'number' },
    { label: '=', value: '=', type: 'action', className: 'bg-indigo-600 text-white' },

    // R9 (Optional Inverses - can fit some here or leave for scrolling)
    // We are getting tall. Let's rely on standard inverse trig buttons:
    { label: 'asin', value: 'asin(', type: 'scientific', className: 'text-[10px]' }, 
    { label: 'acos', value: 'acos(', type: 'scientific', className: 'text-[10px]' },
    { label: 'atan', value: 'atan(', type: 'scientific', className: 'text-[10px]' },
    { label: 'log₂', value: 'log2(', type: 'scientific', className: 'text-[10px]' },
    { label: '⌫', value: 'backspace', type: 'action' },
];

export { COMPREHENSIVE_SCIENTIFIC_LAYOUT as SCIENTIFIC_LAYOUT };