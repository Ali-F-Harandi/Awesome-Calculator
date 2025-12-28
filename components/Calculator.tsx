import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ITranslations, DesignStyle, IHistoryItem, HistoryMode } from '../types';
import { KEYPAD_LAYOUT } from '../data/config';
import { evaluateExpression } from '../services/mathService';
import { provideFeedback } from '../services/feedbackService';
import Display from './Display';
import Button from './Button';
import HistoryModal from './HistoryModal';

interface CalculatorProps {
  t: ITranslations;
  isRTL: boolean;
  designStyle: DesignStyle;
  history: IHistoryItem[];
  onAddToHistory: (expression: string, result: string) => void;
  onToggleHistory: () => void;
  onClearHistory: () => void;
  isHistoryOpen: boolean;
  historyMode: HistoryMode;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({ 
  t, 
  isRTL, 
  designStyle,
  onAddToHistory,
  onToggleHistory,
  onClearHistory,
  isHistoryOpen,
  history,
  historyMode,
  soundEnabled,
  vibrationEnabled
}) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  
  // Memory State
  const [memory, setMemory] = useState<number>(() => {
    return parseFloat(localStorage.getItem('calc_memory') || '0');
  });

  // Ref to track input state inside global event listener closure
  const inputRef = useRef<string>(''); 
  useEffect(() => { inputRef.current = input; }, [input]);

  // Persist Memory
  useEffect(() => {
    localStorage.setItem('calc_memory', memory.toString());
  }, [memory]);

  // --- Logic ---

  // Live Preview
  useEffect(() => {
    if (input) {
      try {
        const res = evaluateExpression(input);
        setResult(res);
        setErrorKey(null);
      } catch (e) {
        setResult('');
        // Don't show error on live preview to avoid annoyance while typing
      }
    } else {
        setResult('');
        setErrorKey(null);
    }
  }, [input]);

  const handleCalculate = useCallback(() => {
    try {
      if (!inputRef.current) return;
      const res = evaluateExpression(inputRef.current);
      
      if (!isNaN(Number(res)) && inputRef.current !== res) {
         onAddToHistory(inputRef.current, res);
      }

      setInput(res);
      setResult('');
      setErrorKey(null);
    } catch (e: any) {
      // Map error message to translation key if possible
      setErrorKey(e.message || 'error');
      setResult('');
    }
  }, [onAddToHistory]);

  const handleMemory = useCallback((action: string) => {
    const currentVal = parseFloat(result || input || '0');
    
    switch (action) {
        case 'mc':
            setMemory(0);
            break;
        case 'mr':
            if (memory !== 0) {
               // If input is empty or ends with operator, append. Else replace.
               const isOperatorLast = /[+\-*/^!(]$/.test(input);
               if (input === '' || isOperatorLast) {
                   setInput(prev => prev + memory.toString());
               } else {
                   setInput(memory.toString());
               }
            }
            break;
        case 'm+':
            if (!isNaN(currentVal)) setMemory(prev => prev + currentVal);
            break;
        case 'm-':
            if (!isNaN(currentVal)) setMemory(prev => prev - currentVal);
            break;
    }
    provideFeedback(soundEnabled, vibrationEnabled, designStyle);
  }, [input, result, memory, soundEnabled, vibrationEnabled, designStyle]);

  const handleInput = useCallback((val: string, type: string, silent: boolean = false) => {
    if (!silent) provideFeedback(soundEnabled, vibrationEnabled, designStyle);
    setErrorKey(null);

    if (type === 'memory') {
        handleMemory(val);
        return;
    }

    if (val === 'clear') {
      setInput('');
      setResult('');
    } else if (val === 'backspace') {
      setInput(prev => prev.slice(0, -1));
    } else if (val === '=') {
      handleCalculate();
    } else {
      setInput(prev => prev + val);
    }
  }, [handleCalculate, handleMemory, soundEnabled, vibrationEnabled, designStyle]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      // Sanitize pasted text: only allow valid characters
      const sanitized = text.replace(/[^0-9+\-*/().\s!^√abs]/g, '');
      if (sanitized) {
        setInput(prev => prev + sanitized);
        provideFeedback(soundEnabled, vibrationEnabled, designStyle);
      }
    } catch (err) {
      console.warn('Paste failed', err);
    }
  }, [soundEnabled, vibrationEnabled, designStyle]);

  const handleCopy = useCallback(() => {
    const textToCopy = result || input;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      provideFeedback(soundEnabled, vibrationEnabled, designStyle);
    }
  }, [input, result, soundEnabled, vibrationEnabled, designStyle]);


  // --- Global Keyboard Listener ---
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'v') {
         if (!(e.target instanceof HTMLInputElement)) {
             handlePaste();
         }
         return;
      }

      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'c') {
         if (window.getSelection()?.toString() === '') {
             handleCopy();
         }
         return;
      }

      if (e.target instanceof HTMLInputElement) {
        if (key === 'Enter') {
          e.preventDefault();
          handleCalculate();
          provideFeedback(soundEnabled, vibrationEnabled, designStyle);
        } else if (key === 'Escape') {
          handleInput('clear', 'action');
        }
        return;
      }

      if (/[0-9+\-*/().^!]/.test(key)) {
        handleInput(key, 'number');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleCalculate();
        provideFeedback(soundEnabled, vibrationEnabled, designStyle);
      } else if (key === 'Backspace') {
        handleInput('backspace', 'action');
      } else if (key === 'Escape') {
        handleInput('clear', 'action');
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleInput, handleCalculate, handlePaste, handleCopy, soundEnabled, vibrationEnabled, designStyle]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[0-9+\-*/().\s!^√abs]*$/.test(val)) {
      setInput(val);
      setErrorKey(null);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if (e.key !== 'Enter' && e.key !== 'Escape') {
         provideFeedback(soundEnabled, vibrationEnabled, designStyle);
     }
  };

  // Get Translated Error
  const getErrorMessage = () => {
      if (!errorKey) return '';
      // @ts-ignore - access safe due to try/catch logic
      return t.errors[errorKey] || t.error;
  };

  const containerStyle = {
      borderRadius: 'var(--radius-main)',
      boxShadow: 'var(--shadow-main)',
      borderWidth: 'var(--border-width)',
  };

  return (
    <div 
        className="w-full max-w-sm bg-white dark:bg-gray-800 flex flex-col relative z-10 border-gray-100 dark:border-gray-700 transition-all duration-300 overflow-hidden"
        style={containerStyle}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center relative">
        <h1 className={`text-lg font-bold text-gray-800 dark:text-white ${designStyle === 'retro' ? 'tracking-widest' : ''}`}>
          {t.title}
        </h1>
        
        <div className="flex items-center gap-2">
            <button 
              onClick={onToggleHistory}
              className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative group ${isHistoryOpen ? 'text-primary bg-primary/10' : 'text-gray-500 dark:text-gray-400'}`}
              title={t.historyTooltip}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               {designStyle === 'cyberpunk' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>}
            </button>

            {designStyle !== 'minimal' && (
                <div className="flex space-x-1 ml-2">
                    <span className={`w-3 h-3 ${designStyle === 'cyberpunk' ? 'bg-primary' : 'bg-red-400'} ${designStyle === 'retro' ? 'rounded-none' : 'rounded-full'}`}></span>
                    <span className={`w-3 h-3 ${designStyle === 'cyberpunk' ? 'bg-secondary' : 'bg-yellow-400'} ${designStyle === 'retro' ? 'rounded-none' : 'rounded-full'}`}></span>
                    <span className={`w-3 h-3 ${designStyle === 'cyberpunk' ? 'bg-white' : 'bg-green-400'} ${designStyle === 'retro' ? 'rounded-none' : 'rounded-full'}`}></span>
                </div>
            )}
        </div>
      </div>

      <div className="p-6">
        <Display
          value={input}
          resultPreview={errorKey ? getErrorMessage() : result}
          placeholder={t.placeholder}
          onChange={handleChange}
          onKeyDown={handleInputKeyDown}
          isRTL={isRTL}
          designStyle={designStyle}
          onCopy={handleCopy}
          memoryActive={memory !== 0} // New prop
          t={t}
        />

        <div className={`grid grid-cols-4 ${designStyle === 'retro' ? 'gap-1 bg-gray-900 p-1 border-2 border-gray-900' : 'gap-3'}`}>
          {KEYPAD_LAYOUT.map((btn, idx) => (
            <Button 
                key={idx} 
                btn={btn} 
                onClick={(val) => handleInput(val, btn.type)} 
                designStyle={designStyle} 
            />
          ))}
        </div>
      </div>
      
      {designStyle !== 'retro' && (
          <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary"></div>
      )}

      {historyMode === 'overlay' && (
        <HistoryModal 
            isOpen={isHistoryOpen} 
            onClose={onToggleHistory} 
            onClear={onClearHistory}
            history={history}
            t={t}
            isRTL={isRTL}
            designStyle={designStyle}
            variant="modal"
        />
      )}
    </div>
  );
};

export default Calculator;