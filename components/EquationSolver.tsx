import React, { useState } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { solveQuadratic, solveSystem2, solveSystem3, solveLinear, solvePythagoras, solveOhmsLaw, QuadraticResult, SystemResult } from '../services/solverService';
import { motion, AnimatePresence } from 'framer-motion';

interface EquationSolverProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  onAddToHistory: (expression: string, result: string) => void;
}

type SolverTab = 'linear' | 'quadratic' | 'system2' | 'system3' | 'pythagoras' | 'ohms';

const EquationSolver: React.FC<EquationSolverProps> = ({ t, designStyle, isRTL, onAddToHistory }) => {
  const [tab, setTab] = useState<SolverTab>('linear');
  
  // --- STATES ---
  // Linear: ax + b = c
  const [lCoeffs, setLCoeffs] = useState({ a: '', b: '', c: '' });
  const [lResult, setLResult] = useState<string | null>(null);

  // Quadratic: ax^2 + bx + c = 0
  const [qCoeffs, setQCoeffs] = useState({ a: '', b: '', c: '' });
  const [qResult, setQResult] = useState<QuadraticResult | null>(null);

  // System 2: 
  const [s2Coeffs, setS2Coeffs] = useState({ a1: '', b1: '', c1: '', a2: '', b2: '', c2: '' });
  const [s2Result, setS2Result] = useState<SystemResult | null>(null);

  // System 3:
  const [s3Coeffs, setS3Coeffs] = useState({ 
      a1: '', b1: '', c1: '', d1: '',
      a2: '', b2: '', c2: '', d2: '',
      a3: '', b3: '', c3: '', d3: '' 
  });
  const [s3Result, setS3Result] = useState<SystemResult | null>(null);

  // Geometry: Pythagoras
  const [pyCoeffs, setPyCoeffs] = useState({ a: '', b: '', c: '' });
  const [pyResult, setPyResult] = useState<string | null>(null);

  // Physics: Ohm's Law
  const [ohmCoeffs, setOhmCoeffs] = useState({ v: '', i: '', r: '' });
  const [ohmResult, setOhmResult] = useState<string | null>(null);


  // --- HANDLERS ---
  const handleSolveLinear = () => {
     const a = parseFloat(lCoeffs.a);
     const b = parseFloat(lCoeffs.b);
     const c = parseFloat(lCoeffs.c);
     if (isNaN(a) || isNaN(b) || isNaN(c)) return;
     const res = solveLinear(a, b, c);
     if (res !== null) {
         setLResult(res.toString());
         onAddToHistory(`${lCoeffs.a}x + ${lCoeffs.b} = ${lCoeffs.c}`, `x = ${res}`);
     } else {
         setLResult("Error");
     }
  };

  const handleSolveQuadratic = () => {
      const a = parseFloat(qCoeffs.a);
      const b = parseFloat(qCoeffs.b);
      const c = parseFloat(qCoeffs.c);
      if (isNaN(a) || isNaN(b) || isNaN(c)) return;
      
      const res = solveQuadratic(a, b, c);
      setQResult(res);
      onAddToHistory(`Roots(${qCoeffs.a}x² + ${qCoeffs.b}x + ${qCoeffs.c})`, res.hasComplex ? t.solver.noRealRoots : res.roots.join(', '));
  };

  const handleSolveSystem2 = () => {
      const nums = Object.values(s2Coeffs).map(v => parseFloat(v as string));
      if (nums.some(isNaN)) return;
      const res = solveSystem2(nums[0], nums[1], nums[2], nums[3], nums[4], nums[5]);
      setS2Result(res);
      
      const expr = `{ ${s2Coeffs.a1}x+${s2Coeffs.b1}y=${s2Coeffs.c1} ; ${s2Coeffs.a2}x+${s2Coeffs.b2}y=${s2Coeffs.c2} }`;
      
      if (res.status === 'unique') {
          onAddToHistory(expr, `x=${res.x}, y=${res.y}`);
      } else {
          onAddToHistory(expr, res.status === 'infinite' ? t.solver.infiniteSolutions : t.solver.noSolution);
      }
  };

  const handleSolveSystem3 = () => {
      const nums = Object.values(s3Coeffs).map(v => parseFloat(v as string));
      if (nums.some(isNaN)) return;
      const res = solveSystem3(
          nums[0], nums[1], nums[2], nums[3],
          nums[4], nums[5], nums[6], nums[7],
          nums[8], nums[9], nums[10], nums[11]
      );
      setS3Result(res);
      
      // Detailed Expression for history
      const expr = `{ ${s3Coeffs.a1}x+${s3Coeffs.b1}y+${s3Coeffs.c1}z=${s3Coeffs.d1} ; ${s3Coeffs.a2}x+${s3Coeffs.b2}y+${s3Coeffs.c2}z=${s3Coeffs.d2} ; ${s3Coeffs.a3}x+${s3Coeffs.b3}y+${s3Coeffs.c3}z=${s3Coeffs.d3} }`;
      
      if (res.status === 'unique') {
          onAddToHistory(expr, `x=${res.x}, y=${res.y}, z=${res.z}`);
      } else {
          onAddToHistory(expr, res.status === 'infinite' ? t.solver.infiniteSolutions : t.solver.noSolution);
      }
  };

  const handleSolvePythagoras = () => {
      // Treat 0 or empty string as "Solve for this" (null)
      const parse = (val: string) => {
          const f = parseFloat(val);
          return (isNaN(f) || f === 0) ? null : f;
      };

      const a = parse(pyCoeffs.a);
      const b = parse(pyCoeffs.b);
      const c = parse(pyCoeffs.c);
      
      const res = solvePythagoras(a, b, c);
      
      if (res) {
          setPyResult(res.toString());
          onAddToHistory(`Pythagoras(a=${a||'?'}, b=${b||'?'}, c=${c||'?'})`, res.toString());
      } else {
          setPyResult("Invalid Input");
      }
  };

  const handleSolveOhms = () => {
      const parse = (val: string) => {
          const f = parseFloat(val);
          return (isNaN(f) || f === 0) ? null : f;
      };

      const v = parse(ohmCoeffs.v);
      const i = parse(ohmCoeffs.i);
      const r = parse(ohmCoeffs.r);

      const res = solveOhmsLaw(v, i, r);
      if (res) {
          setOhmResult(res.toString());
          onAddToHistory(`Ohm's(V=${v||'?'}, I=${i||'?'}, R=${r||'?'})`, res.toString());
      } else {
          setOhmResult("Invalid Input");
      }
  };

  // UI Helpers
  const inputClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-1 font-mono w-full text-center'
    : designStyle === 'cyberpunk'
    ? 'bg-gray-900 border border-primary text-primary p-1 w-full text-center'
    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-1.5 w-full text-center dark:text-white';

  const btnClass = `w-full py-2 rounded-lg font-bold mt-4 transition-all ${
      designStyle === 'retro' ? 'bg-black text-white border-2 border-gray-500' :
      designStyle === 'cyberpunk' ? 'bg-primary text-black shadow-[0_0_10px_rgba(var(--color-primary),0.5)]' :
      'bg-primary text-white shadow-lg shadow-primary/30'
  }`;

  const tabs: { id: SolverTab; label: string; icon: React.ReactNode }[] = [
      { id: 'linear', label: t.solver.tabs.linear, icon: <span className="font-mono text-xs">ax+b</span> },
      { id: 'quadratic', label: t.solver.tabs.quadratic, icon: <span className="font-mono text-xs">x²</span> },
      { id: 'system2', label: 'Sys 2', icon: <span className="font-mono text-xs">{'{2}'}</span> },
      { id: 'system3', label: 'Sys 3', icon: <span className="font-mono text-xs">{'{3}'}</span> },
      { id: 'pythagoras', label: t.solver.tabs.pythagoras, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18L3 3v18z" /></svg> },
      { id: 'ohms', label: t.solver.tabs.ohms, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 3l-6 6M7 3l6 6M10 12v9" /><circle cx="10" cy="16" r="2" /></svg> }
  ];

  return (
    <div className={`flex flex-col h-full overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
       {/* Non-scrolling Flex Tabs */}
       <div className="flex gap-1 pb-2 shrink-0 border-b border-gray-100 dark:border-gray-700 mb-2">
           {tabs.map(item => {
               const isActive = tab === item.id;
               return (
                   <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 overflow-hidden whitespace-nowrap
                          ${isActive 
                              ? 'flex-1 bg-primary text-white shadow-md px-2' 
                              : 'flex-none bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 w-8 sm:w-10'
                          }
                      `}
                      title={item.label}
                   >
                       {item.icon}
                       {isActive && <span className="ml-1">{item.label}</span>}
                   </button>
               )
           })}
       </div>

       {/* Content */}
       <div className="flex-1 overflow-y-auto p-1 custom-scrollbar">
           <AnimatePresence mode="wait">
               
               {/* --- Linear --- */}
               {tab === 'linear' && (
                   <motion.div key="lin" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex flex-col gap-4">
                       <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 text-lg font-serif italic text-gray-700 dark:text-gray-200">
                           <input value={lCoeffs.a} onChange={e => setLCoeffs({...lCoeffs, a: e.target.value})} className={`${inputClass} !w-12`} placeholder="a" />
                           <span>x +</span>
                           <input value={lCoeffs.b} onChange={e => setLCoeffs({...lCoeffs, b: e.target.value})} className={`${inputClass} !w-12`} placeholder="b" />
                           <span>=</span>
                           <input value={lCoeffs.c} onChange={e => setLCoeffs({...lCoeffs, c: e.target.value})} className={`${inputClass} !w-12`} placeholder="c" />
                       </div>
                       <button onClick={handleSolveLinear} className={btnClass}>{t.solver.solve}</button>
                       {lResult && (
                           <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 text-center font-bold text-xl text-green-700 dark:text-green-300">
                               x = {lResult}
                           </div>
                       )}
                   </motion.div>
               )}

               {/* --- Quadratic --- */}
               {tab === 'quadratic' && (
                   <motion.div 
                        key="quad" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}
                        className="flex flex-col gap-4"
                   >
                       <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 text-lg font-serif italic text-gray-700 dark:text-gray-200">
                           <input 
                              value={qCoeffs.a} onChange={e => setQCoeffs({...qCoeffs, a: e.target.value})} 
                              className={`${inputClass} !w-12`} placeholder="a" 
                           />
                           <span>x² +</span>
                           <input 
                              value={qCoeffs.b} onChange={e => setQCoeffs({...qCoeffs, b: e.target.value})} 
                              className={`${inputClass} !w-12`} placeholder="b" 
                           />
                           <span>x +</span>
                           <input 
                              value={qCoeffs.c} onChange={e => setQCoeffs({...qCoeffs, c: e.target.value})} 
                              className={`${inputClass} !w-12`} placeholder="c" 
                           />
                           <span>= 0</span>
                       </div>
                       
                       <button onClick={handleSolveQuadratic} className={btnClass}>{t.solver.solve}</button>

                       {qResult && (
                           <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                               <div className="flex justify-between mb-2">
                                   <span className="text-sm font-bold text-gray-500">{t.solver.discriminant}:</span>
                                   <span className="font-mono">{qResult.discriminant}</span>
                               </div>
                               <div className="flex flex-col gap-1">
                                   <span className="text-sm font-bold text-gray-500">{t.solver.roots}:</span>
                                   {qResult.hasComplex ? (
                                       <span className="text-red-500 font-bold">{t.solver.noRealRoots}</span>
                                   ) : (
                                       qResult.roots.map((r, i) => (
                                           <div key={i} className="font-mono font-bold text-lg text-gray-800 dark:text-white">x<sub>{i+1}</sub> = {r}</div>
                                       ))
                                   )}
                               </div>
                           </div>
                       )}
                   </motion.div>
               )}

               {/* --- System 2x2 --- */}
               {tab === 'system2' && (
                   <motion.div 
                        key="sys2" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}
                        className="flex flex-col gap-4"
                   >
                       <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col gap-2">
                           {/* Eq 1 */}
                           <div className="flex items-center gap-2 justify-center">
                               <input value={s2Coeffs.a1} onChange={e=>setS2Coeffs({...s2Coeffs, a1:e.target.value})} className={`${inputClass} !w-12`} placeholder="a1" />
                               <span>x +</span>
                               <input value={s2Coeffs.b1} onChange={e=>setS2Coeffs({...s2Coeffs, b1:e.target.value})} className={`${inputClass} !w-12`} placeholder="b1" />
                               <span>y =</span>
                               <input value={s2Coeffs.c1} onChange={e=>setS2Coeffs({...s2Coeffs, c1:e.target.value})} className={`${inputClass} !w-12`} placeholder="c1" />
                           </div>
                           {/* Eq 2 */}
                           <div className="flex items-center gap-2 justify-center">
                               <input value={s2Coeffs.a2} onChange={e=>setS2Coeffs({...s2Coeffs, a2:e.target.value})} className={`${inputClass} !w-12`} placeholder="a2" />
                               <span>x +</span>
                               <input value={s2Coeffs.b2} onChange={e=>setS2Coeffs({...s2Coeffs, b2:e.target.value})} className={`${inputClass} !w-12`} placeholder="b2" />
                               <span>y =</span>
                               <input value={s2Coeffs.c2} onChange={e=>setS2Coeffs({...s2Coeffs, c2:e.target.value})} className={`${inputClass} !w-12`} placeholder="c2" />
                           </div>
                       </div>

                       <button onClick={handleSolveSystem2} className={btnClass}>{t.solver.solve}</button>

                       {s2Result && (
                           <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                               {s2Result.status === 'unique' ? (
                                   <div className="flex justify-around">
                                       <div className="text-lg font-bold">x = {s2Result.x}</div>
                                       <div className="text-lg font-bold">y = {s2Result.y}</div>
                                   </div>
                               ) : (
                                   <div className="text-red-500 font-bold">{s2Result.status === 'infinite' ? t.solver.infiniteSolutions : t.solver.noSolution}</div>
                               )}
                           </div>
                       )}
                   </motion.div>
               )}

                {/* --- System 3x3 --- */}
               {tab === 'system3' && (
                   <motion.div 
                        key="sys3" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}
                        className="flex flex-col gap-4"
                   >
                       <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col gap-2 text-sm">
                           {[1, 2, 3].map(i => (
                               <div key={i} className="flex items-center gap-1 justify-center">
                                   <input 
                                        // @ts-ignore
                                        value={s3Coeffs[`a${i}`]} onChange={e=>setS3Coeffs({...s3Coeffs, [`a${i}`]:e.target.value})} className={`${inputClass} !w-10`} placeholder="a" 
                                   />
                                   <span>x+</span>
                                   <input 
                                        // @ts-ignore
                                        value={s3Coeffs[`b${i}`]} onChange={e=>setS3Coeffs({...s3Coeffs, [`b${i}`]:e.target.value})} className={`${inputClass} !w-10`} placeholder="b" 
                                   />
                                   <span>y+</span>
                                   <input 
                                        // @ts-ignore
                                        value={s3Coeffs[`c${i}`]} onChange={e=>setS3Coeffs({...s3Coeffs, [`c${i}`]:e.target.value})} className={`${inputClass} !w-10`} placeholder="c" 
                                   />
                                   <span>z=</span>
                                   <input 
                                        // @ts-ignore
                                        value={s3Coeffs[`d${i}`]} onChange={e=>setS3Coeffs({...s3Coeffs, [`d${i}`]:e.target.value})} className={`${inputClass} !w-10`} placeholder="d" 
                                   />
                               </div>
                           ))}
                       </div>

                       <button onClick={handleSolveSystem3} className={btnClass}>{t.solver.solve}</button>

                       {s3Result && (
                           <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800 text-center">
                               {s3Result.status === 'unique' ? (
                                   <div className="flex flex-wrap justify-around gap-2">
                                       <div className="text-lg font-bold">x = {s3Result.x}</div>
                                       <div className="text-lg font-bold">y = {s3Result.y}</div>
                                       <div className="text-lg font-bold">z = {s3Result.z}</div>
                                   </div>
                               ) : (
                                   <div className="text-red-500 font-bold">{s3Result.status === 'infinite' ? t.solver.infiniteSolutions : t.solver.noSolution}</div>
                               )}
                           </div>
                       )}
                   </motion.div>
               )}

               {/* --- Pythagoras --- */}
               {tab === 'pythagoras' && (
                   <motion.div key="py" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                            <p className="text-center text-sm text-gray-500 font-mono">a² + b² = c²</p>
                            {/* Help Text Added Here */}
                            <p className="text-center text-xs text-primary mb-2 italic">
                                {t.solver.pythagorasHelp}
                            </p>
                            
                            <div className="flex justify-between items-center gap-2">
                                <label className="text-xs font-bold w-16">{t.solver.sides.a}</label>
                                <input value={pyCoeffs.a} onChange={e=>setPyCoeffs({...pyCoeffs, a:e.target.value})} className={inputClass} placeholder="a" />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <label className="text-xs font-bold w-16">{t.solver.sides.b}</label>
                                <input value={pyCoeffs.b} onChange={e=>setPyCoeffs({...pyCoeffs, b:e.target.value})} className={inputClass} placeholder="b" />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <label className="text-xs font-bold w-16 text-primary">{t.solver.sides.c}</label>
                                <input value={pyCoeffs.c} onChange={e=>setPyCoeffs({...pyCoeffs, c:e.target.value})} className={inputClass} placeholder="c" />
                            </div>
                        </div>
                        <button onClick={handleSolvePythagoras} className={btnClass}>{t.solver.solve}</button>
                        {pyResult && (
                           <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800 text-center font-bold text-xl text-orange-700 dark:text-orange-300">
                               {pyResult}
                           </div>
                        )}
                   </motion.div>
               )}

               {/* --- Ohm's Law --- */}
               {tab === 'ohms' && (
                   <motion.div key="ohm" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                            <p className="text-center text-sm text-gray-500 mb-2 font-mono">V = I × R</p>
                            <div className="flex justify-between items-center gap-2">
                                <label className="text-xs font-bold w-20">{t.solver.physics.v}</label>
                                <input value={ohmCoeffs.v} onChange={e=>setOhmCoeffs({...ohmCoeffs, v:e.target.value})} className={inputClass} placeholder="V" />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <label className="text-xs font-bold w-20">{t.solver.physics.i}</label>
                                <input value={ohmCoeffs.i} onChange={e=>setOhmCoeffs({...ohmCoeffs, i:e.target.value})} className={inputClass} placeholder="A" />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <label className="text-xs font-bold w-20">{t.solver.physics.r}</label>
                                <input value={ohmCoeffs.r} onChange={e=>setOhmCoeffs({...ohmCoeffs, r:e.target.value})} className={inputClass} placeholder="Ω" />
                            </div>
                        </div>
                        <button onClick={handleSolveOhms} className={btnClass}>{t.solver.solve}</button>
                        {ohmResult && (
                           <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800 text-center font-bold text-xl text-yellow-700 dark:text-yellow-300">
                               {ohmResult}
                           </div>
                        )}
                   </motion.div>
               )}

           </AnimatePresence>
       </div>
    </div>
  );
};

export default EquationSolver;