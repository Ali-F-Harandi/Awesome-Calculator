
import React, { useState } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface EngineeringCalculatorProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  onAddToHistory: (expression: string, result: string) => void;
}

type Tab = 'circuits' | 'mechanics' | 'thermo';

const EngineeringCalculator: React.FC<EngineeringCalculatorProps> = ({ t, designStyle, isRTL, onAddToHistory }) => {
  const [tab, setTab] = useState<Tab>('circuits');
  
  // State for Inputs
  const [cRes, setCRes] = useState({ r1: '', r2: '' });
  const [mech, setMech] = useState({ m: '', a: '', v: '' });
  const [therm, setTherm] = useState({ m: '', c: '', dt: '' });
  
  const [result, setResult] = useState<string | null>(null);

  const calculateCircuit = (type: 'series' | 'parallel') => {
      const r1 = parseFloat(cRes.r1);
      const r2 = parseFloat(cRes.r2);
      if (isNaN(r1) || isNaN(r2)) return;
      
      let res = 0;
      if (type === 'series') res = r1 + r2;
      else res = (r1 * r2) / (r1 + r2);
      
      setResult(`${res.toFixed(4)} Ω`);
      onAddToHistory(`R_${type}(${r1}, ${r2})`, res.toFixed(4));
  };

  const calculateForce = () => {
      const m = parseFloat(mech.m);
      const a = parseFloat(mech.a);
      if (isNaN(m) || isNaN(a)) return;
      const f = m * a;
      setResult(`${f.toFixed(4)} N`);
      onAddToHistory(`F=ma(${m}, ${a})`, f.toFixed(4));
  };

  const calculateKE = () => {
      const m = parseFloat(mech.m);
      const v = parseFloat(mech.v);
      if (isNaN(m) || isNaN(v)) return;
      const ke = 0.5 * m * v * v;
      setResult(`${ke.toFixed(4)} J`);
      onAddToHistory(`KE=0.5mv²(${m}, ${v})`, ke.toFixed(4));
  };

  const calculateHeat = () => {
      const m = parseFloat(therm.m);
      const c = parseFloat(therm.c);
      const dt = parseFloat(therm.dt);
      if (isNaN(m) || isNaN(c) || isNaN(dt)) return;
      const q = m * c * dt;
      setResult(`${q.toFixed(4)} J`);
      onAddToHistory(`Q=mcΔT(${m}, ${c}, ${dt})`, q.toFixed(4));
  };

  const inputClass = `w-full p-2 rounded outline-none border ${designStyle === 'retro' ? 'border-black bg-white font-mono' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white'}`;
  const btnClass = "bg-primary text-white font-bold py-2 px-4 rounded shadow hover:opacity-90 transition active:scale-95 text-xs sm:text-sm";

  return (
    <div className={`flex flex-col h-full gap-4 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-100 dark:border-gray-700 pb-2 shrink-0 overflow-x-auto">
            {['circuits', 'mechanics', 'thermo'].map(tb => (
                <button
                    key={tb}
                    onClick={() => { setTab(tb as Tab); setResult(null); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition
                        ${tab === tb ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}
                    `}
                >
                    {/* @ts-ignore */}
                    {t.engineering.tabs[tb]}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
            <AnimatePresence mode="wait">
                
                {tab === 'circuits' && (
                    <motion.div key="circuits" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div><label className="text-xs font-bold text-gray-500">{t.engineering.circuits.r1}</label><input type="number" value={cRes.r1} onChange={e=>setCRes({...cRes, r1:e.target.value})} className={inputClass} /></div>
                            <div><label className="text-xs font-bold text-gray-500">{t.engineering.circuits.r2}</label><input type="number" value={cRes.r2} onChange={e=>setCRes({...cRes, r2:e.target.value})} className={inputClass} /></div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={()=>calculateCircuit('series')} className={`flex-1 ${btnClass}`}>{t.engineering.circuits.series}</button>
                            <button onClick={()=>calculateCircuit('parallel')} className={`flex-1 ${btnClass}`}>{t.engineering.circuits.parallel}</button>
                        </div>
                    </motion.div>
                )}

                {tab === 'mechanics' && (
                    <motion.div key="mechanics" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                            <div><label className="text-xs font-bold text-gray-500">{t.engineering.mechanics.mass}</label><input type="number" value={mech.m} onChange={e=>setMech({...mech, m:e.target.value})} className={inputClass} /></div>
                            <div><label className="text-xs font-bold text-gray-500">{t.engineering.mechanics.accel}</label><input type="number" value={mech.a} onChange={e=>setMech({...mech, a:e.target.value})} className={inputClass} /></div>
                            <div><label className="text-xs font-bold text-gray-500">{t.engineering.mechanics.velocity}</label><input type="number" value={mech.v} onChange={e=>setMech({...mech, v:e.target.value})} className={inputClass} /></div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={calculateForce} className={`flex-1 ${btnClass}`}>{t.engineering.mechanics.force}</button>
                            <button onClick={calculateKE} className={`flex-1 ${btnClass}`}>{t.engineering.mechanics.ke}</button>
                        </div>
                    </motion.div>
                )}

                {tab === 'thermo' && (
                    <motion.div key="thermo" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                            <div><label className="text-xs font-bold text-gray-500">Mass (kg)</label><input type="number" value={therm.m} onChange={e=>setTherm({...therm, m:e.target.value})} className={inputClass} /></div>
                            <div><label className="text-xs font-bold text-gray-500">{t.engineering.thermo.shc}</label><input type="number" value={therm.c} onChange={e=>setTherm({...therm, c:e.target.value})} className={inputClass} /></div>
                            <div><label className="text-xs font-bold text-gray-500">{t.engineering.thermo.deltaT}</label><input type="number" value={therm.dt} onChange={e=>setTherm({...therm, dt:e.target.value})} className={inputClass} /></div>
                        </div>
                        <button onClick={calculateHeat} className={`w-full ${btnClass}`}>{t.engineering.thermo.heat}</button>
                    </motion.div>
                )}

            </AnimatePresence>

            {result && (
                <motion.div initial={{scale:0}} animate={{scale:1}} className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                    <span className="text-sm font-bold text-gray-500 block mb-1">Result</span>
                    <span className="text-2xl font-black text-primary">{result}</span>
                </motion.div>
            )}
        </div>
    </div>
  );
};

export default EngineeringCalculator;
