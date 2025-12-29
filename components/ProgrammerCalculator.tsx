
import React, { useState, useEffect } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { convertBase, bitwiseOp } from '../services/programmerService';

interface ProgrammerCalculatorProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  onAddToHistory: (expression: string, result: string) => void;
}

type Base = 16 | 10 | 8 | 2;

const ProgrammerCalculator: React.FC<ProgrammerCalculatorProps> = ({ t, designStyle, isRTL, onAddToHistory }) => {
  const [value, setValue] = useState<string>('0');
  const [base, setBase] = useState<Base>(10);
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  // Sync representations
  const hex = convertBase(value, base, 16);
  const dec = convertBase(value, base, 10);
  const oct = convertBase(value, base, 8);
  const bin = convertBase(value, base, 2);

  const handleInput = (char: string) => {
      setValue(prev => (prev === '0' || prev === '' ? char : prev + char));
  };

  const handleBaseChange = (newBase: Base) => {
      const converted = convertBase(value, base, newBase);
      setValue(converted);
      setBase(newBase);
  };

  const handleBackspace = () => {
      setValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const handleClear = () => {
      setValue('0');
      setStoredValue(null);
      setOperation(null);
  };

  const handleOp = (op: string) => {
      if (op === 'NOT') {
          const res = bitwiseOp(value, '0', 'NOT', base);
          setValue(res);
          onAddToHistory(`NOT ${value}`, res);
      } else {
          setStoredValue(value);
          setOperation(op);
          setValue('0');
      }
  };

  const handleEqual = () => {
      if (!storedValue || !operation) return;
      // @ts-ignore
      const res = bitwiseOp(storedValue, value, operation, base);
      onAddToHistory(`${storedValue} ${operation} ${value}`, res);
      setValue(res);
      setStoredValue(null);
      setOperation(null);
  };

  // Buttons configuration based on current base
  const renderKeypad = () => {
      const keys = [
          ['A', 'B', '7', '8', '9'],
          ['C', 'D', '4', '5', '6'],
          ['E', 'F', '1', '2', '3'],
          ['00', '', '0', '', ''] // Padding for grid
      ];
      
      const isHex = base === 16;
      const isDec = base === 10;
      const isOct = base === 8;
      
      return (
          <div className="grid grid-cols-5 gap-2 flex-1 h-full">
              {keys.map((row, rIdx) => (
                  row.map((k, cIdx) => {
                      if (!k) return <div key={`${rIdx}-${cIdx}`} />;
                      
                      const disabled = 
                          (base === 10 && /[A-F]/.test(k)) ||
                          (base === 8 && /[8-9A-F]/.test(k)) ||
                          (base === 2 && /[2-9A-F]/.test(k));

                      return (
                          <button 
                              key={k} 
                              disabled={disabled}
                              onClick={() => handleInput(k)}
                              className={`rounded-lg font-bold text-lg transition shadow-sm active:scale-95
                                  ${disabled 
                                      ? 'opacity-20 bg-gray-100 dark:bg-gray-800' 
                                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                                  }
                                  ${designStyle === 'retro' ? 'border border-black rounded-none shadow-[2px_2px_0_0_#000]' : ''}
                              `}
                          >
                              {k}
                          </button>
                      )
                  })
              ))}
          </div>
      );
  };

  const displayClass = `p-2 rounded-lg font-mono text-sm flex justify-between cursor-pointer border transition-colors ${
      designStyle === 'retro' ? 'bg-white border-black text-black' : 
      'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
  }`;

  const activeDisplayClass = designStyle === 'retro' 
      ? 'bg-black text-white border-black' 
      : 'bg-primary/10 border-primary text-primary font-bold';

  return (
    <div className={`flex flex-col h-full gap-3 p-1 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Displays */}
        <div className="flex flex-col gap-1 shrink-0">
            <div onClick={()=>handleBaseChange(16)} className={`${displayClass} ${base===16 ? activeDisplayClass : 'text-gray-500'}`}>
                <span>HEX</span><span>{hex}</span>
            </div>
            <div onClick={()=>handleBaseChange(10)} className={`${displayClass} ${base===10 ? activeDisplayClass : 'text-gray-500'}`}>
                <span>DEC</span><span>{dec}</span>
            </div>
            <div onClick={()=>handleBaseChange(8)} className={`${displayClass} ${base===8 ? activeDisplayClass : 'text-gray-500'}`}>
                <span>OCT</span><span>{oct}</span>
            </div>
            <div onClick={()=>handleBaseChange(2)} className={`${displayClass} ${base===2 ? activeDisplayClass : 'text-gray-500'}`}>
                <span>BIN</span><span>{bin}</span>
            </div>
        </div>

        {/* Ops & Keypad Container */}
        <div className="flex gap-2 flex-1 min-h-0">
            
            {/* Bitwise Ops */}
            <div className="flex flex-col gap-2 w-1/4">
                {['AND', 'OR', 'XOR', 'NOT', 'NAND', 'NOR'].map(op => (
                    <button 
                        key={op} 
                        onClick={() => handleOp(op)}
                        className={`flex-1 rounded text-xs font-bold transition
                            ${designStyle === 'retro' ? 'bg-gray-300 border border-black' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}
                            ${operation === op ? 'ring-2 ring-primary' : ''}
                        `}
                    >
                        {op}
                    </button>
                ))}
            </div>

            {/* Keypad */}
            <div className="flex flex-col gap-2 w-3/4">
                {renderKeypad()}
                <div className="flex gap-2 h-12">
                    <button onClick={handleBackspace} className="flex-1 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200">⌫</button>
                    <button onClick={handleClear} className="flex-1 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200">AC</button>
                    <button onClick={handleEqual} className="flex-1 bg-primary text-white font-bold rounded-lg shadow-lg hover:opacity-90">=</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProgrammerCalculator;
