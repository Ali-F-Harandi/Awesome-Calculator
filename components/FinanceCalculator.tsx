import React, { useState } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FinanceCalculatorProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  onAddToHistory: (expression: string, result: string) => void;
}

type FinanceTab = 'loan' | 'discount' | 'bmi';

const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ t, designStyle, isRTL, onAddToHistory }) => {
  const [tab, setTab] = useState<FinanceTab>('loan');

  // Loan State
  const [loanValues, setLoanValues] = useState({ principal: '', rate: '', years: '' });
  const [loanResult, setLoanResult] = useState<{ monthly: string; totalInterest: string } | null>(null);

  // Discount State
  const [discountValues, setDiscountValues] = useState({ price: '', percent: '' });
  const [discountResult, setDiscountResult] = useState<{ final: string; saved: string } | null>(null);

  // BMI State
  const [bmiValues, setBmiValues] = useState({ weight: '', height: '' });
  const [bmiResult, setBmiResult] = useState<{ bmi: string; status: string } | null>(null);

  // --- Handlers ---

  const calculateLoan = () => {
    const p = parseFloat(loanValues.principal);
    const r = parseFloat(loanValues.rate) / 100 / 12; // Monthly rate
    const n = parseFloat(loanValues.years) * 12; // Total months

    if (p && r && n) {
      // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPay = monthly * n;
      const totalInterest = totalPay - p;

      const res = {
        monthly: monthly.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      };
      setLoanResult(res);
      onAddToHistory(`Loan(${p}, ${loanValues.rate}%, ${loanValues.years}yr)`, `Monthly: ${res.monthly}`);
    }
  };

  const calculateDiscount = () => {
    const price = parseFloat(discountValues.price);
    const disc = parseFloat(discountValues.percent);

    if (price && !isNaN(disc)) {
      const saved = price * (disc / 100);
      const final = price - saved;
      
      const res = {
        final: final.toFixed(2),
        saved: saved.toFixed(2)
      };
      setDiscountResult(res);
      onAddToHistory(`Discount(${price}, ${disc}%)`, `Final: ${res.final}`);
    }
  };

  const calculateBMI = () => {
    const w = parseFloat(bmiValues.weight);
    const h = parseFloat(bmiValues.height) / 100; // cm to m

    if (w && h) {
      const bmi = w / (h * h);
      let status = '';
      if (bmi < 18.5) status = t.finance.bmi.statuses.underweight;
      else if (bmi < 25) status = t.finance.bmi.statuses.normal;
      else if (bmi < 30) status = t.finance.bmi.statuses.overweight;
      else status = t.finance.bmi.statuses.obese;

      const res = {
        bmi: bmi.toFixed(1),
        status: status
      };
      setBmiResult(res);
      onAddToHistory(`BMI(w:${w}, h:${bmiValues.height})`, `${res.bmi} (${status})`);
    }
  };

  // --- Styles ---
  const inputClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-2 font-mono w-full text-center outline-none'
    : designStyle === 'cyberpunk'
    ? 'bg-gray-900 border border-primary text-primary p-2 w-full text-center outline-none focus:shadow-[0_0_10px_rgba(var(--color-primary),0.5)]'
    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 w-full text-center dark:text-white outline-none focus:ring-2 ring-primary/50';

  const btnClass = `w-full py-3 rounded-xl font-bold mt-4 transition-all ${
      designStyle === 'retro' ? 'bg-black text-white border-2 border-gray-500' :
      designStyle === 'cyberpunk' ? 'bg-primary text-black shadow-[0_0_10px_rgba(var(--color-primary),0.5)]' :
      'bg-primary text-white shadow-lg shadow-primary/30 active:scale-95'
  }`;

  const cardClass = designStyle === 'retro' 
    ? 'bg-gray-100 border-2 border-black p-4' 
    : designStyle === 'neobrutalism'
    ? 'bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
    : 'bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700';

  return (
    <div className={`flex flex-col h-full overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
       
       {/* Tabs */}
       <div className="flex gap-2 pb-4 shrink-0 border-b border-gray-100 dark:border-gray-700 mb-2 overflow-x-auto">
           {[
               {id: 'loan', label: t.finance.tabs.loan, icon: '$'},
               {id: 'discount', label: t.finance.tabs.discount, icon: '%'},
               {id: 'bmi', label: t.finance.tabs.bmi, icon: '♥'}
           ].map((item) => (
               <button
                  key={item.id}
                  onClick={() => setTab(item.id as FinanceTab)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2
                      ${tab === item.id 
                          ? 'bg-primary text-white shadow-md' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                  `}
               >
                   <span>{item.icon}</span>
                   <span>{item.label}</span>
               </button>
           ))}
       </div>

       {/* Content */}
       <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
           <AnimatePresence mode="wait">
               
               {/* LOAN */}
               {tab === 'loan' && (
                   <motion.div key="loan" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col gap-4">
                       <div className={cardClass}>
                           <div className="space-y-3">
                               <div>
                                   <label className="text-xs text-gray-500 font-bold block mb-1">{t.finance.loan.principal}</label>
                                   <input type="number" value={loanValues.principal} onChange={e=>setLoanValues({...loanValues, principal:e.target.value})} className={inputClass} placeholder="10000000" />
                               </div>
                               <div>
                                   <label className="text-xs text-gray-500 font-bold block mb-1">{t.finance.loan.rate}</label>
                                   <input type="number" value={loanValues.rate} onChange={e=>setLoanValues({...loanValues, rate:e.target.value})} className={inputClass} placeholder="18" />
                               </div>
                               <div>
                                   <label className="text-xs text-gray-500 font-bold block mb-1">{t.finance.loan.years}</label>
                                   <input type="number" value={loanValues.years} onChange={e=>setLoanValues({...loanValues, years:e.target.value})} className={inputClass} placeholder="5" />
                               </div>
                           </div>
                           <button onClick={calculateLoan} className={btnClass}>{t.calculate}</button>
                       </div>

                       {loanResult && (
                           <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-xl text-center space-y-2">
                               <div>
                                   <div className="text-xs text-green-600 dark:text-green-400 font-bold uppercase">{t.finance.loan.monthlyPayment}</div>
                                   <div className="text-2xl font-black text-green-800 dark:text-green-300">{loanResult.monthly}</div>
                               </div>
                               <div className="pt-2 border-t border-green-200 dark:border-green-800/50">
                                   <div className="text-xs text-green-600 dark:text-green-400">{t.finance.loan.totalInterest}</div>
                                   <div className="font-bold text-green-800 dark:text-green-300">{loanResult.totalInterest}</div>
                               </div>
                           </div>
                       )}
                   </motion.div>
               )}

               {/* DISCOUNT */}
               {tab === 'discount' && (
                   <motion.div key="discount" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col gap-4">
                        <div className={cardClass}>
                           <div className="space-y-3">
                               <div>
                                   <label className="text-xs text-gray-500 font-bold block mb-1">{t.finance.discount.price}</label>
                                   <input type="number" value={discountValues.price} onChange={e=>setDiscountValues({...discountValues, price:e.target.value})} className={inputClass} placeholder="50000" />
                               </div>
                               <div>
                                   <label className="text-xs text-gray-500 font-bold block mb-1">{t.finance.discount.discount}</label>
                                   <input type="number" value={discountValues.percent} onChange={e=>setDiscountValues({...discountValues, percent:e.target.value})} className={inputClass} placeholder="25" />
                               </div>
                           </div>
                           <button onClick={calculateDiscount} className={btnClass}>{t.calculate}</button>
                       </div>

                       {discountResult && (
                           <div className="flex gap-2">
                               <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl text-center">
                                   <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">{t.finance.discount.finalPrice}</div>
                                   <div className="text-xl font-black text-blue-800 dark:text-blue-300">{discountResult.final}</div>
                               </div>
                               <div className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-center flex flex-col justify-center">
                                   <div className="text-xs text-gray-500">{t.finance.discount.saved}</div>
                                   <div className="font-bold text-gray-700 dark:text-gray-300">{discountResult.saved}</div>
                               </div>
                           </div>
                       )}
                   </motion.div>
               )}

               {/* BMI */}
               {tab === 'bmi' && (
                   <motion.div key="bmi" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="flex flex-col gap-4">
                        <div className={cardClass}>
                           <div className="space-y-3">
                               <div>
                                   <label className="text-xs text-gray-500 font-bold block mb-1">{t.finance.bmi.weight}</label>
                                   <input type="number" value={bmiValues.weight} onChange={e=>setBmiValues({...bmiValues, weight:e.target.value})} className={inputClass} placeholder="70" />
                               </div>
                               <div>
                                   <label className="text-xs text-gray-500 font-bold block mb-1">{t.finance.bmi.height}</label>
                                   <input type="number" value={bmiValues.height} onChange={e=>setBmiValues({...bmiValues, height:e.target.value})} className={inputClass} placeholder="175" />
                               </div>
                           </div>
                           <button onClick={calculateBMI} className={btnClass}>{t.calculate}</button>
                       </div>

                       {bmiResult && (
                           <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-4 rounded-xl text-center space-y-2">
                               <div>
                                   <div className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase">{t.finance.bmi.result}</div>
                                   <div className="text-3xl font-black text-orange-800 dark:text-orange-300">{bmiResult.bmi}</div>
                               </div>
                               <div className="inline-block px-3 py-1 bg-white dark:bg-black/20 rounded-full text-sm font-bold text-orange-700 dark:text-orange-200">
                                   {bmiResult.status}
                               </div>
                           </div>
                       )}
                   </motion.div>
               )}
           </AnimatePresence>
       </div>
    </div>
  );
};

export default FinanceCalculator;