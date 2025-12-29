
import React, { useState } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface GeometryCalculatorProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  onAddToHistory: (expression: string, result: string) => void;
}

type Shape = 'circle' | 'rectangle' | 'triangle' | 'sphere' | 'cylinder' | 'cone';

const GeometryCalculator: React.FC<GeometryCalculatorProps> = ({ t, designStyle, isRTL, onAddToHistory }) => {
  const [shape, setShape] = useState<Shape>('circle');
  const [dims, setDims] = useState({ r: '', w: '', h: '', b: '', a: '' }); // radius, width, height, base, side
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
      const r = parseFloat(dims.r);
      const w = parseFloat(dims.w);
      const h = parseFloat(dims.h);
      const b = parseFloat(dims.b);
      const a = parseFloat(dims.a); // Side or specific dimension

      let resStr = "";
      
      switch (shape) {
          case 'circle':
              if (isNaN(r)) return;
              resStr = `Area: ${(Math.PI * r * r).toFixed(2)}, Perm: ${(2 * Math.PI * r).toFixed(2)}`;
              break;
          case 'rectangle':
              if (isNaN(w) || isNaN(h)) return;
              resStr = `Area: ${(w * h).toFixed(2)}, Perm: ${(2 * (w + h)).toFixed(2)}`;
              break;
          case 'triangle':
              if (isNaN(b) || isNaN(h)) return;
              resStr = `Area: ${(0.5 * b * h).toFixed(2)}`;
              break;
          case 'sphere':
              if (isNaN(r)) return;
              resStr = `Vol: ${((4/3) * Math.PI * Math.pow(r, 3)).toFixed(2)}, Area: ${(4 * Math.PI * r * r).toFixed(2)}`;
              break;
          case 'cylinder':
              if (isNaN(r) || isNaN(h)) return;
              resStr = `Vol: ${(Math.PI * r * r * h).toFixed(2)}`;
              break;
          case 'cone':
              if (isNaN(r) || isNaN(h)) return;
              resStr = `Vol: ${((1/3) * Math.PI * r * r * h).toFixed(2)}`;
              break;
      }
      
      setResult(resStr);
      onAddToHistory(`${shape} calc`, resStr);
  };

  const inputClass = `w-full p-2 rounded outline-none border ${designStyle === 'retro' ? 'border-black bg-white font-mono' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white'}`;

  return (
    <div className={`flex flex-col h-full gap-4 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Shape Select */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
            {Object.keys(t.geometry.shapes).map(k => (
                <button 
                    key={k} 
                    onClick={()=>{setShape(k as Shape); setResult(null)}}
                    className={`py-2 px-1 text-xs font-bold rounded-lg transition border 
                        ${shape === k 
                            ? 'bg-primary text-white border-primary shadow-md' 
                            : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                >
                    {/* @ts-ignore */}
                    {t.geometry.shapes[k]}
                </button>
            ))}
        </div>

        {/* Inputs */}
        <div className="flex-1 overflow-y-auto p-1 custom-scrollbar">
            <AnimatePresence mode="wait">
                <motion.div key={shape} initial={{opacity:0, x:10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-10}} className="space-y-4">
                    
                    {(shape === 'circle' || shape === 'sphere' || shape === 'cylinder' || shape === 'cone') && (
                        <div><label className="text-xs font-bold text-gray-500">{t.geometry.inputs.radius}</label><input type="number" value={dims.r} onChange={e=>setDims({...dims, r:e.target.value})} className={inputClass} /></div>
                    )}
                    {(shape === 'rectangle') && (
                        <div><label className="text-xs font-bold text-gray-500">{t.geometry.inputs.width}</label><input type="number" value={dims.w} onChange={e=>setDims({...dims, w:e.target.value})} className={inputClass} /></div>
                    )}
                    {(shape === 'rectangle' || shape === 'triangle' || shape === 'cylinder' || shape === 'cone') && (
                        <div><label className="text-xs font-bold text-gray-500">{t.geometry.inputs.height}</label><input type="number" value={dims.h} onChange={e=>setDims({...dims, h:e.target.value})} className={inputClass} /></div>
                    )}
                    {(shape === 'triangle') && (
                        <div><label className="text-xs font-bold text-gray-500">{t.geometry.inputs.base}</label><input type="number" value={dims.b} onChange={e=>setDims({...dims, b:e.target.value})} className={inputClass} /></div>
                    )}

                    <button 
                        onClick={calculate}
                        className="w-full py-3 bg-secondary text-white font-bold rounded-xl shadow hover:opacity-90 transition active:scale-95"
                    >
                        {t.calculate}
                    </button>

                </motion.div>
            </AnimatePresence>

            {result && (
                <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl text-center">
                    <span className="text-lg font-bold text-orange-800 dark:text-orange-200">{result}</span>
                </motion.div>
            )}
        </div>
    </div>
  );
};

export default GeometryCalculator;
