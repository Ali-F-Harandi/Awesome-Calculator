import React, { useState, useEffect } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { UNIT_DATA, UnitCategory, convertUnit } from '../data/units';
import { motion, AnimatePresence } from 'framer-motion';

interface ConverterProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  onAddToHistory: (expression: string, result: string) => void;
}

const Converter: React.FC<ConverterProps> = ({ t, designStyle, isRTL, onAddToHistory }) => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [showSaved, setShowSaved] = useState(false);

  // Initialize defaults when category changes
  useEffect(() => {
    const units = UNIT_DATA[category];
    if (units && units.length > 0) {
      setFromUnit(units[0].id);
      setToUnit(units[1]?.id || units[0].id);
      // Reset amount for base conversion vs others
      setAmount(category === 'base' ? '10' : '1');
    }
  }, [category]);

  // Perform Calculation
  useEffect(() => {
    if (amount === '') {
      setResult('...');
      return;
    }
    
    const res = convertUnit(amount, fromUnit, toUnit, category);
    
    if (category === 'base') {
       setResult(res);
    } else {
       const floatVal = parseFloat(res);
       if (!isNaN(floatVal)) {
          setResult(parseFloat(floatVal.toFixed(6)).toString());
       } else {
          setResult(res);
       }
    }

  }, [amount, fromUnit, toUnit, category]);

  // Swap Handler
  const handleSwap = () => {
      const temp = fromUnit;
      setFromUnit(toUnit);
      setToUnit(temp);
  };

  const handleSave = () => {
    if (!amount || !result || amount === '...' || result === '...') return;
    
    const expr = `${amount} ${fromUnit} → ${toUnit}`;
    const resVal = `${result}`;
    
    onAddToHistory(expr, resVal);
    
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  // Styles
  const containerClass = designStyle === 'retro' 
    ? 'bg-[#d4d4d2] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col justify-between h-full' 
    : designStyle === 'cyberpunk'
    ? 'bg-black border border-primary/50 shadow-[0_0_15px_rgba(var(--color-primary),0.3)] p-4 flex flex-col justify-between h-full'
    : designStyle === 'minimal'
    ? 'bg-transparent p-2 flex flex-col justify-between h-full'
    : 'bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 shadow-inner flex flex-col justify-between h-full';

  const inputClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-2 font-mono text-lg w-full outline-none focus:bg-yellow-50'
    : designStyle === 'cyberpunk'
    ? 'bg-gray-900 border border-gray-700 text-primary p-2 w-full outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(var(--color-primary),0.5)]'
    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-lg w-full outline-none focus:ring-2 ring-primary/50';

  const selectClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-2 font-bold w-full outline-none'
    : designStyle === 'cyberpunk'
    ? 'bg-gray-900 border border-gray-700 text-secondary p-2 w-full outline-none'
    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 w-full outline-none text-xs sm:text-sm';

  const categories: UnitCategory[] = ['length', 'mass', 'temperature', 'speed', 'data', 'time', 'base'];

  // Button Style
  let buttonClass = "";
  if (designStyle === 'retro') {
      buttonClass = "bg-primary text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";
  } else if (designStyle === 'cyberpunk') {
      buttonClass = "bg-primary/20 text-primary border border-primary hover:bg-primary hover:text-black shadow-[0_0_10px_rgba(var(--color-primary),0.5)]";
  } else if (designStyle === 'minimal') {
      buttonClass = "bg-black dark:bg-white text-white dark:text-black border border-transparent";
  } else {
      buttonClass = "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90";
  }

  return (
    <div className={`flex flex-col gap-4 w-full h-full ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Category Tabs - Grid Layout (2 Rows) */}
      <div className="grid grid-cols-4 gap-2 pb-2 shrink-0">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-1 py-1.5 text-[10px] sm:text-xs font-bold transition-all rounded-md truncate
              ${category === cat 
                ? (designStyle === 'retro' ? 'bg-black text-white' : 'bg-primary text-white shadow-md') 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600'
              }
            `}
            title={
                // @ts-ignore
                t.converter[cat]
            }
          >
            {/* @ts-ignore */}
            {t.converter[cat]}
          </button>
        ))}
      </div>

      <div className={containerClass}>
        
        <div>
            {/* FROM Section */}
            <div className="flex flex-col gap-2 mb-4">
            <label className="text-xs font-bold text-gray-400 uppercase">{t.converter.from}</label>
            <div className="flex gap-2">
                <input 
                type={category === 'base' ? "text" : "number"} 
                value={amount} 
                onChange={(e) => setAmount(e.target.value.toUpperCase())} 
                className={inputClass}
                placeholder={category === 'base' ? "e.g. 101 or FF" : "0"}
                autoComplete="off"
                />
                <select 
                    value={fromUnit} 
                    onChange={(e) => setFromUnit(e.target.value)}
                    className={`${selectClass} w-24 sm:w-32 shrink-0`}
                >
                    {UNIT_DATA[category].map(u => (
                    // @ts-ignore
                    <option key={u.id} value={u.id}>{t.converter.units[u.id] || u.id}</option>
                    ))}
                </select>
            </div>
            </div>

            {/* Swap Button (Interactive) */}
            <div className="flex justify-center -my-3 relative z-10">
                <button 
                    onClick={handleSwap}
                    className={`p-1.5 rounded-full transition-all shadow-sm border flex items-center justify-center
                        ${designStyle === 'retro' 
                            ? 'bg-white border-2 border-black hover:bg-black hover:text-white' 
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 hover:text-primary hover:border-primary'
                        }
                    `}
                    title="Swap Units"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                </button>
            </div>

            {/* TO Section */}
            <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs font-bold text-gray-400 uppercase">{t.converter.to}</label>
            <div className="flex gap-2 items-center">
                <div className={`${inputClass} flex items-center overflow-hidden bg-gray-100 dark:bg-gray-900/50`}>
                    <span className={`font-bold truncate ${designStyle === 'cyberpunk' ? 'text-primary' : 'text-gray-800 dark:text-gray-100'}`}>
                        {result}
                    </span>
                </div>
                <select 
                    value={toUnit} 
                    onChange={(e) => setToUnit(e.target.value)}
                    className={`${selectClass} w-24 sm:w-32 shrink-0`}
                >
                    {UNIT_DATA[category].map(u => (
                    // @ts-ignore
                    <option key={u.id} value={u.id}>{t.converter.units[u.id] || u.id}</option>
                    ))}
                </select>
            </div>
            </div>
            
            {category === 'base' && (
            <p className="text-[10px] text-gray-400 mt-2 text-center">
                {isRTL 
                    ? 'برای مبنای ۱۶ (Hex) از حروف A تا F استفاده کنید.' 
                    : 'Use A-F for Hexadecimal inputs.'}
            </p>
            )}
        </div>

        {/* Action Button */}
        <div className="mt-4 flex justify-end">
            <button 
                onClick={handleSave}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${buttonClass}`}
            >
               <AnimatePresence mode="wait">
                   {showSaved ? (
                       <motion.span 
                            key="saved"
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            exit={{ scale: 0 }}
                            className="flex items-center gap-1"
                       >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                           {isRTL ? 'ذخیره شد' : 'Saved'}
                       </motion.span>
                   ) : (
                       <motion.span 
                           key="save"
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }} 
                           exit={{ opacity: 0 }}
                           className="flex items-center gap-2"
                       >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            {/* @ts-ignore */}
                            {t.converter.addToHistory}
                       </motion.span>
                   )}
               </AnimatePresence>
            </button>
        </div>

      </div>
    </div>
  );
};

export default Converter;