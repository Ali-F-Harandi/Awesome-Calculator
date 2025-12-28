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
  const [error, setError] = useState<boolean>(false);
  
  // Ref to track input state inside global event listener closure
  const inputRef = useRef<string>(''); 
  useEffect(() => { inputRef.current = input; }, [input]);

  // --- Logic ---

  useEffect(() => {
    if (input) {
      try {
        const res = evaluateExpression(input);
        setResult(res);
        setError(false);
      } catch (e) {
        setResult('');
      }
    } else {
        setResult('');
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
      setError(false);
    } catch (e) {
      setError(true);
      setResult('');
    }
  }, [onAddToHistory]);

  const handleInput = useCallback((val: string, silent: boolean = false) => {
    if (!silent) provideFeedback(soundEnabled, vibrationEnabled, designStyle);
    setError(false);

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
  }, [handleCalculate, soundEnabled, vibrationEnabled, designStyle]);

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

      // Handle Paste (Ctrl+V)
      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'v') {
         // Allow browser default for input fields, otherwise handle manually
         if (!(e.target instanceof HTMLInputElement)) {
             handlePaste();
         }
         return;
      }

      // Handle Copy (Ctrl+C)
      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'c') {
         // If selecting text in input, let browser handle it.
         // Otherwise copy result/input logic.
         if (window.getSelection()?.toString() === '') {
             handleCopy();
         }
         return;
      }

      // If typing in the input field directly, let the onChange handler manage it to avoid double entry
      if (e.target instanceof HTMLInputElement) {
        if (key === 'Enter') {
          e.preventDefault();
          handleCalculate();
          provideFeedback(soundEnabled, vibrationEnabled, designStyle);
        } else if (key === 'Escape') {
          handleInput('clear');
        }
        return;
      }

      // Global mapping when NOT focused on input
      if (/[0-9+\-*/().^!]/.test(key)) {
        handleInput(key);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleCalculate();
        provideFeedback(soundEnabled, vibrationEnabled, designStyle);
      } else if (key === 'Backspace') {
        handleInput('backspace');
      } else if (key === 'Escape') {
        handleInput('clear');
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleInput, handleCalculate, handlePaste, handleCopy, soundEnabled, vibrationEnabled, designStyle]);


  // Handler for direct input changes (e.g. typing or mobile keyboard)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[0-9+\-*/().\s!^√abs]*$/.test(val)) {
      setInput(val);
      setError(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if (e.key !== 'Enter' && e.key !== 'Escape') {
         // Typing directly in input also plays sound
         provideFeedback(soundEnabled, vibrationEnabled, designStyle);
     }
  };


  // Dynamic styling based on CSS variables
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
          resultPreview={error ? t.error : result}
          placeholder={t.placeholder}
          onChange={handleChange}
          onKeyDown={handleInputKeyDown}
          isRTL={isRTL}
          designStyle={designStyle}
          onCopy={handleCopy}
        />

        <div className={`grid grid-cols-4 ${designStyle === 'retro' ? 'gap-1 bg-gray-900 p-1 border-2 border-gray-900' : 'gap-3'}`}>
          {KEYPAD_LAYOUT.map((btn, idx) => (
            <Button 
                key={idx} 
                btn={btn} 
                onClick={(val) => handleInput(val)} // Feedback is handled inside handleInput
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