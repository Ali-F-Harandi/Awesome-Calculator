
import React, { useState } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { parseStatsInput, calculateStats } from '../services/statisticsService';
import { motion } from 'framer-motion';

interface StatisticsCalculatorProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  onAddToHistory: (expression: string, result: string) => void;
}

const StatisticsCalculator: React.FC<StatisticsCalculatorProps> = ({ t, designStyle, isRTL, onAddToHistory }) => {
  const [input, setInput] = useState('');
  const [singleInput, setSingleInput] = useState('');
  const [stats, setStats] = useState<any>(null);

  const handleCalculate = () => {
      const data = parseStatsInput(input);
      if (data.length === 0) return;
      
      const res = calculateStats(data);
      setStats(res);
      
      onAddToHistory(`Stats(n=${res.count})`, `Mean: ${res.mean.toFixed(2)}, σ: ${res.stdDev.toFixed(2)}`);
  };

  const handleAddSingle = () => {
      if (!singleInput.trim()) return;
      const num = parseFloat(singleInput);
      if (isNaN(num)) return;

      setInput(prev => {
          const separator = prev.trim().length > 0 ? ', ' : '';
          return prev + separator + num;
      });
      setSingleInput('');
  };

  const handleClear = () => {
      setInput('');
      setStats(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          handleAddSingle();
      }
  };

  const statItemClass = designStyle === 'retro' 
    ? "flex justify-between p-2 border border-black bg-white font-mono text-sm"
    : "flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-sm";

  const inputClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-2 font-mono outline-none'
    : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 ring-primary/50 dark:text-white rounded-lg p-2 outline-none';

  return (
    <div className={`flex flex-col h-full gap-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Input Area */}
        <div className="flex flex-col gap-2 shrink-0">
            {/* Single Entry Row */}
            <div className="flex gap-2">
                <input 
                    type="number" 
                    value={singleInput}
                    onChange={(e) => setSingleInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="123"
                    className={`${inputClass} flex-1`}
                />
                <button 
                    onClick={handleAddSingle}
                    className="px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow hover:opacity-90 transition active:scale-95"
                >
                    {t.statistics.add || '+ Add'}
                </button>
            </div>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.statistics.inputPlaceholder}
                className={`w-full h-20 p-3 rounded-xl resize-none outline-none transition-all ${
                    designStyle === 'retro' ? 'bg-white border-4 border-black font-mono' :
                    designStyle === 'cyberpunk' ? 'bg-black border border-primary text-primary' :
                    'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 ring-primary/50 dark:text-white'
                }`}
            />
            <div className="flex gap-2">
                <button 
                    onClick={handleCalculate}
                    className="flex-1 bg-primary text-white font-bold py-2 rounded-lg shadow hover:opacity-90 transition active:scale-95"
                >
                    {t.statistics.calc}
                </button>
                <button 
                    onClick={handleClear}
                    className="px-4 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    {t.statistics.clear}
                </button>
            </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 p-1">
            {stats && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid gap-2 pb-2">
                    <div className={statItemClass}><span>{t.statistics.results.count}</span><span className="font-bold">{stats.count}</span></div>
                    <div className={statItemClass}><span>{t.statistics.results.sum}</span><span className="font-bold">{stats.sum}</span></div>
                    <div className={statItemClass}><span>{t.statistics.results.mean}</span><span className="font-bold text-primary">{stats.mean.toFixed(4)}</span></div>
                    <div className={statItemClass}><span>{t.statistics.results.median}</span><span className="font-bold">{stats.median}</span></div>
                    <div className={statItemClass}><span>{t.statistics.results.mode}</span><span className="font-bold">{stats.mode}</span></div>
                    <div className={statItemClass}><span>{t.statistics.results.min}</span><span className="font-bold">{stats.min}</span></div>
                    <div className={statItemClass}><span>{t.statistics.results.max}</span><span className="font-bold">{stats.max}</span></div>
                    <div className={statItemClass}><span>{t.statistics.results.variance}</span><span className="font-bold">{stats.variance.toFixed(4)}</span></div>
                    <div className={statItemClass}><span>{t.statistics.results.stdDev}</span><span className="font-bold text-secondary">{stats.stdDev.toFixed(4)}</span></div>
                </motion.div>
            )}
            {!stats && (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm italic opacity-60">
                    Waiting for data...
                </div>
            )}
        </div>
    </div>
  );
};

export default StatisticsCalculator;
