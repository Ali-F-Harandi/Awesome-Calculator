

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ITranslations, DesignStyle, IHistoryItem, HistoryMode, AppMode, AngleMode } from '../types';
import { KEYPAD_LAYOUT, SCIENTIFIC_LAYOUT } from '../data/config';
import { evaluateExpression } from '../services/mathService';
import { provideFeedback } from '../services/feedbackService';
import Display from './Display';
import Button from './Button';
import HistoryModal from './HistoryModal';
import ModeSwitcher from './ModeSwitcher';
import Converter from './Converter'; 
import GraphingCalculator from './GraphingCalculator'; 
import EquationSolver from './EquationSolver';
import FinanceCalculator from './FinanceCalculator';
import CurrencyConverter from './CurrencyConverter';
import TimeCalculator from './TimeCalculator';
import MatrixCalculator from './MatrixCalculator';
import StatisticsCalculator from './StatisticsCalculator';
import ProgrammerCalculator from './ProgrammerCalculator';
import EngineeringCalculator from './EngineeringCalculator';
import GeometryCalculator from './GeometryCalculator';
import LearningCenter from './LearningCenter';
import MathGame from './MathGame';
import AIAssistant from './AIAssistant';
import CameraMath from './CameraMath';
import { motion, AnimatePresence } from 'framer-motion';

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
  apiKey?: string; // New prop for AI
  onOpenSettings?: () => void; // New prop for AI
}

// Map for Superscripts
const SUPER_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '-': '⁻', '.': '⋅' 
};

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
  vibrationEnabled,
  apiKey,
  onOpenSettings
}) => {
  // Mode State
  const [mode, setMode] = useState<AppMode>('standard');
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG'); // New Angle Mode

  const [input, setInput] = useState<string>('');
  const [formula, setFormula] = useState<string>(''); // Top line
  const [resultPreview, setResultPreview] = useState<string>('');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false); // Flag to check if result is displayed
  
  const [isExponentMode, setIsExponentMode] = useState<boolean>(false);

  // Memory State
  const [memory, setMemory] = useState<number>(() => {
    return parseFloat(localStorage.getItem('calc_memory') || '0');
  });

  const inputRef = useRef<string>(''); 
  useEffect(() => { inputRef.current = input; }, [input]);

  useEffect(() => {
    localStorage.setItem('calc_memory', memory.toString());
  }, [memory]);

  // Determine if Dark Mode is active (for Graphing styling)
  const isDark = document.documentElement.classList.contains('dark');

  // Live Preview
  useEffect(() => {
    if (input && !isCalculated) {
      try {
        const res = evaluateExpression(input, angleMode);
        setResultPreview(res);
        setErrorKey(null);
      } catch (e) {
        setResultPreview('');
      }
    } else {
        setResultPreview('');
        setErrorKey(null);
    }
  }, [input, isCalculated, angleMode]);

  const handleCalculate = useCallback(() => {
    try {
      if (!inputRef.current) return;
      const res = evaluateExpression(inputRef.current, angleMode);
      
      if (!isNaN(Number(res))) {
         onAddToHistory(inputRef.current, res);
      }

      setFormula(inputRef.current + ' ='); // Move input to top line
      setInput(res); // Show result in main line
      setIsCalculated(true);
      setResultPreview('');
      setErrorKey(null);
      setIsExponentMode(false);
    } catch (e: any) {
      setErrorKey(e.message || 'error');
      setFormula('');
      setResultPreview('');
    }
  }, [onAddToHistory, angleMode]);

  const handleMemory = useCallback((action: string) => {
    const currentVal = parseFloat(input || '0'); // Use input (which might be result)
    switch (action) {
        case 'mc': setMemory(0); break;
        case 'mr':
            if (memory !== 0) {
               // If freshly calculated, overwrite.
               if (isCalculated) {
                   setInput(memory.toString());
                   setFormula('');
                   setIsCalculated(false);
               } else {
                   const isOperatorLast = /[+\-×÷^!(|]$/.test(input);
                   if (input === '' || isOperatorLast) {
                       setInput(prev => prev + memory.toString());
                   } else {
                       setInput(memory.toString());
                   }
               }
            }
            break;
        case 'm+': if (!isNaN(currentVal)) setMemory(prev => prev + currentVal); break;
        case 'm-': if (!isNaN(currentVal)) setMemory(prev => prev - currentVal); break;
    }
    provideFeedback(soundEnabled, vibrationEnabled, designStyle);
  }, [input, memory, soundEnabled, vibrationEnabled, designStyle, isCalculated]);

  const handleInput = useCallback((val: string, type: string, silent: boolean = false) => {
    if (!silent) provideFeedback(soundEnabled, vibrationEnabled, designStyle);
    setErrorKey(null);

    // --- Special Logic for Visual Math & Dual Line ---

    if (type === 'memory') {
        handleMemory(val);
        return;
    }

    if (val === 'clear') {
      setInput('');
      setFormula('');
      setResultPreview('');
      setIsCalculated(false);
      setIsExponentMode(false);
      return;
    } 

    if (val === 'backspace') {
      if (isCalculated) {
          // If clearing a result, just clear all
          setInput('');
          setFormula('');
          setIsCalculated(false);
      } else {
          setInput(prev => prev.length > 0 ? `|${prev}|` : '|');
      }
      return;
    } 
    
    if (val === '=') {
      handleCalculate();
      return;
    }

    if (val === 'abs') {
      if (isCalculated) {
          // Wrap result
          setInput(`|${input}|`);
          setFormula('');
          setIsCalculated(false);
      } else {
          setInput(prev => prev.length > 0 ? `|${prev}|` : '|');
      }
      setIsExponentMode(false);
      return;
    }

    // Power Shortcuts Logic
    if (val === 'pow') {
       if (isCalculated) {
           setFormula('');
           setIsCalculated(false);
       }
       setIsExponentMode(true);
       return;
    }
    
    const appendInput = (char: string) => {
        if (isCalculated) {
            if (type === 'operator' || type === 'scientific') {
                setFormula(''); 
                setInput(prev => prev + char);
            } else {
                setFormula('');
                setInput(char); 
            }
            setIsCalculated(false);
        } else {
            setInput(prev => prev + char);
        }
    };
    
    // Shortcuts
    if (val === 'x²') { appendInput('²'); return; }
    if (val === 'x³') { appendInput('³'); return; }
    if (val === '10˟') { appendInput('10^'); setIsExponentMode(true); return; } 

    if (type === 'operator') {
       let visualOp = val;
       if (val === '*') visualOp = '×';
       if (val === '/') visualOp = '÷';
       appendInput(visualOp);
       setIsExponentMode(false);
       return;
    }

    if (type === 'number') {
        if (isExponentMode) {
            const superChar = SUPER_MAP[val] || val;
            setInput(prev => prev + superChar); 
        } else {
            appendInput(val);
        }
        return;
    }

    if (type === 'scientific') {
        if (val === 'pow') { setIsExponentMode(true); return; } // Generic ^
        appendInput(val);
        setIsExponentMode(false);
    }

  }, [handleCalculate, handleMemory, soundEnabled, vibrationEnabled, designStyle, isExponentMode, isCalculated, input]);

  // --- Paste Logic ---
  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const sanitized = text.replace(/[^0-9+\-×÷*\/().\s!^√|⁰¹²³⁴⁵⁶⁷⁸⁹]/g, '');
      if (sanitized) {
        setInput(prev => prev + sanitized);
        setIsCalculated(false);
        provideFeedback(soundEnabled, vibrationEnabled, designStyle);
      }
    } catch (err) {
      console.warn('Paste failed', err);
    }
  }, [soundEnabled, vibrationEnabled, designStyle]);

  const handleCopy = useCallback(() => {
    const textToCopy = input; // Copy main display
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      provideFeedback(soundEnabled, vibrationEnabled, designStyle);
    }
  }, [input, soundEnabled, vibrationEnabled, designStyle]);
  
  // Voice Input Handler
  const handleVoiceInput = (text: string) => {
      setInput(prev => prev + text);
      setIsCalculated(false);
  };

  // --- Global Keyboard ---
  useEffect(() => {
    // Disable keys in advanced modes that have their own inputs
    if (['converter', 'graphing', 'solver', 'finance', 'currency', 'time', 'matrix', 'statistics', 'programmer', 'engineering', 'geometry', 'game', 'ai', 'camera'].includes(mode)) return; 

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'v') {
         if (!(e.target instanceof HTMLInputElement)) handlePaste();
         return;
      }
      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'c') {
         if (window.getSelection()?.toString() === '') handleCopy();
         return;
      }

      if (e.target instanceof HTMLInputElement) {
        if (key === 'Enter') { e.preventDefault(); handleCalculate(); provideFeedback(soundEnabled, vibrationEnabled, designStyle); }
        else if (key === 'Escape') handleInput('clear', 'action');
        return;
      }

      if (/[0-9]/.test(key)) handleInput(key, 'number');
      else if (key === '.') handleInput('.', 'number');
      else if (key === '+') handleInput('+', 'operator');
      else if (key === '-') handleInput('-', 'operator');
      else if (key === '*') handleInput('*', 'operator');
      else if (key === '/') handleInput('/', 'operator');
      else if (key === '^') handleInput('pow', 'scientific');
      else if (key === '|') handleInput('|', 'scientific');
      else if (key === 'Enter' || key === '=') { e.preventDefault(); handleCalculate(); provideFeedback(soundEnabled, vibrationEnabled, designStyle); }
      else if (key === 'Backspace') handleInput('backspace', 'action');
      else if (key === 'Escape') handleInput('clear', 'action');
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleInput, handleCalculate, handlePaste, handleCopy, soundEnabled, vibrationEnabled, designStyle, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[0-9+\-×÷*\/().\s!^√|⁰¹²³⁴⁵⁶⁷⁸⁹]*$/.test(val)) {
      setInput(val);
      setIsCalculated(false);
      setErrorKey(null);
    }
  };

  const getErrorMessage = () => {
      if (!errorKey) return '';
      // @ts-ignore
      return t.errors[errorKey] || t.error;
  };

  const containerStyle = {
      borderRadius: 'var(--radius-main)',
      boxShadow: 'var(--shadow-main)',
      borderWidth: 'var(--border-width)',
  };

  // Glassmorphism special container
  // Update main layout to flex-row for desktop to accommodate sidebar
  let mainContainerClass = "w-full bg-white dark:bg-gray-800 flex flex-col md:flex-row landscape:flex-row landscape:lg:flex-row relative z-10 border-gray-100 dark:border-gray-700 transition-all duration-300 overflow-hidden";
  
  if (designStyle === 'glass') {
      mainContainerClass = "w-full bg-white/20 dark:bg-black/20 backdrop-filter backdrop-blur-xl flex flex-col md:flex-row landscape:flex-row landscape:lg:flex-row relative z-10 border border-white/30 dark:border-white/10 transition-all duration-300 overflow-hidden";
  } else if (designStyle === 'neobrutalism') {
      mainContainerClass = "w-full bg-white dark:bg-gray-800 flex flex-col md:flex-row landscape:flex-row landscape:lg:flex-row relative z-10 border-4 border-black dark:border-white transition-all duration-300 overflow-hidden";
  }

  // Render Content based on Mode
  const renderModeContent = () => {
    if (mode === 'camera') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <CameraMath t={t} designStyle={designStyle} isRTL={isRTL} />
            </div>
        );
    }

    if (mode === 'ai') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <AIAssistant 
                    t={t} 
                    designStyle={designStyle} 
                    isRTL={isRTL} 
                    apiKey={apiKey || ''} 
                    onOpenSettings={onOpenSettings || (() => {})}
                />
            </div>
        );
    }

    if (mode === 'game') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <MathGame t={t} designStyle={designStyle} isRTL={isRTL} />
            </div>
        );
    }

    if (mode === 'learning') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <LearningCenter t={t} designStyle={designStyle} isRTL={isRTL} />
            </div>
        );
    }

    if (mode === 'programmer') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <ProgrammerCalculator t={t} designStyle={designStyle} isRTL={isRTL} onAddToHistory={onAddToHistory} />
            </div>
        );
    }

    if (mode === 'engineering') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <EngineeringCalculator t={t} designStyle={designStyle} isRTL={isRTL} onAddToHistory={onAddToHistory} />
            </div>
        );
    }

    if (mode === 'geometry') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <GeometryCalculator t={t} designStyle={designStyle} isRTL={isRTL} onAddToHistory={onAddToHistory} />
            </div>
        );
    }

    if (mode === 'matrix') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <MatrixCalculator t={t} designStyle={designStyle} isRTL={isRTL} onAddToHistory={onAddToHistory} />
            </div>
        );
    }

    if (mode === 'statistics') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <StatisticsCalculator t={t} designStyle={designStyle} isRTL={isRTL} onAddToHistory={onAddToHistory} />
            </div>
        );
    }

    if (mode === 'currency') {
        return (
            <div className={`w-full h-[400px] landscape:h-full`}>
                <CurrencyConverter t={t} designStyle={designStyle} isRTL={isRTL} />
            </div>
        );
    }

    if (mode === 'time') {
        return (
            <div className={`w-full h-[400px] landscape:h-full`}>
                <TimeCalculator t={t} designStyle={designStyle} isRTL={isRTL} />
            </div>
        );
    }

    if (mode === 'finance') {
        return (
            <div className={`w-full h-[400px] landscape:h-full`}>
                <FinanceCalculator t={t} designStyle={designStyle} isRTL={isRTL} onAddToHistory={onAddToHistory} />
            </div>
        );
    }
    
    if (mode === 'graphing') {
        return (
            <div className={`w-full h-[400px] landscape:h-full`}>
                <GraphingCalculator t={t} designStyle={designStyle} isDark={isDark} />
            </div>
        );
    }
    
    if (mode === 'solver') {
        return (
            <div className={`w-full h-[450px] landscape:h-full`}>
                <EquationSolver t={t} designStyle={designStyle} isRTL={isRTL} onAddToHistory={onAddToHistory} />
            </div>
        );
    }

    if (mode === 'converter') {
        return (
            <div className={`w-full h-[400px] landscape:h-full ${designStyle === 'retro' ? 'bg-gray-900 p-1 border-2 border-gray-900' : ''}`}>
                <Converter t={t} designStyle={designStyle} isRTL={isRTL} onAddToHistory={onAddToHistory} />
            </div>
        );
    }

    if (mode === 'scientific') {
      return (
        <div className={`grid grid-cols-5 w-full landscape:w-full ${designStyle === 'retro' ? 'gap-1 bg-gray-900 p-1 border-2 border-gray-900' : (designStyle === 'neobrutalism' ? 'gap-2 p-2' : 'gap-2 landscape:gap-1.5')}`}>
          {SCIENTIFIC_LAYOUT.map((btn, idx) => (
            <Button 
                key={idx} 
                btn={btn} 
                onClick={(val) => handleInput(val, btn.type)} 
                designStyle={designStyle} 
            />
          ))}
        </div>
      );
    }
    
    if (mode === 'standard') {
        return (
          <div className={`grid grid-cols-4 w-full landscape:w-full ${designStyle === 'retro' ? 'gap-1 bg-gray-900 p-1 border-2 border-gray-900' : (designStyle === 'neobrutalism' ? 'gap-3 p-2' : 'gap-3 landscape:gap-1.5')}`}>
            {KEYPAD_LAYOUT.map((btn, idx) => (
              <Button 
                  key={idx} 
                  btn={btn} 
                  onClick={(val) => handleInput(val, btn.type)} 
                  designStyle={designStyle} 
              />
            ))}
          </div>
        );
    }
    
    return null;
  };
  
  // Header Text Class
  let headerTextClass = "text-lg font-bold text-gray-800 dark:text-white";
  if (designStyle === 'glass') headerTextClass = "text-lg font-bold text-gray-800 dark:text-white drop-shadow-sm";
  if (designStyle === 'neobrutalism') headerTextClass = "text-lg font-black text-black dark:text-white uppercase";

  // Sidebar Wrapper Class (Dynamic per theme to avoid double borders)
  // Changed fixed widths to w-auto to allow ModeSwitcher grid to dictate width
  let sidebarWrapperClass = "hidden md:block h-full shrink-0 z-20 ";
  if (designStyle === 'retro') {
      sidebarWrapperClass += "bg-[#d4d4d2] p-0 w-auto border-r-2 border-black";
  } else if (designStyle === 'cyberpunk') {
      sidebarWrapperClass += "bg-black p-0 w-auto border-r border-gray-800";
  } else if (designStyle === 'neobrutalism') {
      sidebarWrapperClass += "bg-white dark:bg-gray-800 border-r-4 border-black dark:border-white p-2 w-auto"; 
  } else if (designStyle === 'glass') {
       sidebarWrapperClass += "bg-white/10 dark:bg-black/10 border-r border-white/20 backdrop-blur-md p-2 w-auto"; 
  } else if (designStyle === 'minimal') {
       sidebarWrapperClass += "bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 p-0 w-auto"; 
  } else {
      // Modern
      sidebarWrapperClass += "bg-gray-50/50 dark:bg-gray-900/50 border-r border-gray-100 dark:border-gray-700 p-2 w-auto";
  }

  // Hide Display component for full-screen tools like Time/Currency if needed, 
  // but usually users want to see calculation history or input. 
  // For V3, I will hide the main display for Currency and Time modes to give them more space.
  const showMainDisplay = !['currency', 'time', 'finance', 'graphing', 'solver', 'converter', 'matrix', 'statistics', 'programmer', 'engineering', 'geometry', 'learning', 'game', 'ai', 'camera'].includes(mode);

  return (
    <motion.div 
        layout 
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={mainContainerClass}
        style={containerStyle}
    >
      {/* 
        Desktop Sidebar Mode Switcher (Hidden on Mobile)
      */}
      <div className={sidebarWrapperClass}>
           <ModeSwitcher currentMode={mode} onSwitch={setMode} t={t} designStyle={designStyle} />
      </div>

      {/* 
         Main Content Wrapper 
      */}
      <div className="flex-1 flex flex-col w-full min-w-0 relative">

          {/* 
            Header Section (Title + History + Mobile Tabs)
          */}
          <div className="px-6 pt-6 pb-2 flex flex-col justify-center relative landscape:hidden landscape:lg:flex shrink-0">
            <div className="flex justify-between items-center w-full mb-3">
                <h1 className={`${headerTextClass} ${designStyle === 'retro' ? 'tracking-widest' : ''}`}>
                {t.title}
                </h1>
                <div className="flex items-center gap-2">
                    <button 
                    onClick={onToggleHistory}
                    className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative group 
                      ${isHistoryOpen ? 'text-primary bg-primary/10' : (designStyle === 'glass' ? 'text-gray-600 dark:text-white/80 hover:bg-white/20' : 'text-gray-500 dark:text-gray-400')}`}
                    title={t.historyTooltip}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {designStyle === 'cyberpunk' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>}
                    </button>
                    {designStyle !== 'minimal' && designStyle !== 'glass' && designStyle !== 'neobrutalism' && (
                        <div className="flex space-x-1 ml-2">
                            <span className={`w-3 h-3 ${designStyle === 'cyberpunk' ? 'bg-primary' : 'bg-red-400'} ${designStyle === 'retro' ? 'rounded-none' : 'rounded-full'}`}></span>
                            <span className={`w-3 h-3 ${designStyle === 'cyberpunk' ? 'bg-secondary' : 'bg-yellow-400'} ${designStyle === 'retro' ? 'rounded-none' : 'rounded-full'}`}></span>
                            <span className={`w-3 h-3 ${designStyle === 'cyberpunk' ? 'bg-white' : 'bg-green-400'} ${designStyle === 'retro' ? 'rounded-none' : 'rounded-full'}`}></span>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Mobile Mode Switcher (Hidden on Desktop) */}
            <div className="md:hidden">
                <ModeSwitcher currentMode={mode} onSwitch={setMode} t={t} designStyle={designStyle} />
            </div>

          </div>

          {/* 
            Main Content Area (Display + Views)
          */}
          <div className="p-6 pt-0 landscape:p-4 landscape:w-full landscape:flex landscape:flex-row landscape:gap-4 landscape:lg:block landscape:lg:w-auto h-full flex-1 overflow-y-auto custom-scrollbar">
            
            {/* Left Column: Display - Hide in Complex Modes */}
            {showMainDisplay && (
                <div className="w-full landscape:w-5/12 landscape:lg:w-full landscape:flex landscape:flex-col landscape:justify-center landscape:lg:block relative">
                
                {/* Angle Mode Toggle (Overlay on Display or above) */}
                {mode === 'scientific' && (
                    <button 
                        onClick={() => setAngleMode(prev => prev === 'DEG' ? 'RAD' : 'DEG')}
                        className={`absolute top-0 left-0 z-20 text-[10px] font-bold px-2 py-1 rounded transition-colors
                            ${designStyle === 'glass' 
                                ? 'bg-white/20 text-gray-700 dark:text-white hover:bg-white/40 backdrop-blur' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white'}`}
                        style={{ top: '-10px', left: '10px' }} // Position adjust
                    >
                        {angleMode}
                    </button>
                )}

                <Display
                    value={input}
                    formula={formula}
                    resultPreview={errorKey ? getErrorMessage() : resultPreview}
                    placeholder={t.placeholder}
                    onChange={handleChange}
                    onKeyDown={(e) => { if(e.key!=='Enter'&&e.key!=='Escape') provideFeedback(soundEnabled, vibrationEnabled, designStyle); }}
                    isRTL={isRTL}
                    designStyle={designStyle}
                    onCopy={handleCopy}
                    memoryActive={memory !== 0}
                    t={t}
                    onVoiceInput={handleVoiceInput}
                />
                </div>
            )}

            {/* Right Column: Content + Mobile Landscape Tabs */}
            {/* If converter/graphing/solver/finance/currency/time mode, make this full width */}
            <div className={`w-full ${!showMainDisplay ? '' : 'landscape:w-7/12 landscape:lg:w-full'}`}>
                
                <div className="hidden landscape:block landscape:lg:hidden mb-1">
                    <ModeSwitcher currentMode={mode} onSwitch={setMode} t={t} designStyle={designStyle} />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={mode}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderModeContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
          </div>
          
      </div>

       {/* Bottom Color Bar (Moved outside content flex to be Absolute Bottom) */}
       {designStyle !== 'retro' && designStyle !== 'glass' && designStyle !== 'neobrutalism' && (
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary z-30 landscape:hidden landscape:lg:block"></div>
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
    </motion.div>
  );
};

export default Calculator;
