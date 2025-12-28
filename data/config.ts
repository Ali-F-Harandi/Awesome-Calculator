import { IKeypadButton } from '../types';

export const KEYPAD_LAYOUT: IKeypadButton[] = [
  // Memory Row (New in v1.6.0)
  { label: 'MC', value: 'mc', type: 'memory', className: 'text-sm font-bold text-gray-500' },
  { label: 'MR', value: 'mr', type: 'memory', className: 'text-sm font-bold text-gray-500' },
  { label: 'M+', value: 'm+', type: 'memory', className: 'text-sm font-bold text-gray-500' },
  { label: 'M-', value: 'm-', type: 'memory', className: 'text-sm font-bold text-gray-500' },

  // Scientific Row
  { label: '√', value: '√(', type: 'scientific' },
  { label: '^', value: '^', type: 'scientific' },
  { label: 'x!', value: '!', type: 'scientific' },
  { label: '|x|', value: 'abs(', type: 'scientific' },

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