

import React, { useState, useEffect } from 'react';
import { ITranslations, DesignStyle } from '../types';

interface CurrencyConverterProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
}

const POPULAR_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'IRR', 'CAD', 'AUD', 'AED', 'TRY'];

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ t, designStyle, isRTL }) => {
  const [base, setBase] = useState('USD');
  const [amount, setAmount] = useState('1');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [error, setError] = useState(false);

  const fetchRates = async () => {
      setLoading(true);
      setError(false);
      try {
          // Using a free open API
          const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
          const data = await res.json();
          setRates(data.rates);
          setLastUpdate(new Date(data.time_last_updated * 1000).toLocaleString());
      } catch (e) {
          setError(true);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchRates();
  }, [base]);

  const convert = (curr: string) => {
      if (!rates[curr]) return '...';
      const val = parseFloat(amount);
      if (isNaN(val)) return '...';
      return (val * rates[curr]).toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const cardClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-2 mb-2 font-mono flex justify-between items-center'
    : designStyle === 'cyberpunk'
    ? 'bg-gray-900 border border-gray-700 p-3 mb-2 rounded flex justify-between items-center text-primary'
    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 mb-2 flex justify-between items-center shadow-sm';

  const inputClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-2 font-mono w-full outline-none'
    : designStyle === 'cyberpunk'
    ? 'bg-black border border-primary text-primary p-2 w-full outline-none'
    : 'bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg p-3 w-full outline-none dark:text-white';

  return (
    <div className={`flex flex-col h-full overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Header Control */}
        <div className="p-1 shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 mb-2">
            <div className="flex gap-2 mb-2">
                 <select 
                    value={base} 
                    onChange={e => setBase(e.target.value)}
                    className={`${inputClass} !w-1/3 font-bold`}
                 >
                     {POPULAR_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
                 <input 
                    type="number" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)}
                    className={`${inputClass} !w-2/3`}
                    placeholder="100"
                 />
            </div>
            <div className="flex justify-between items-center px-1">
                 <span className="text-[10px] text-gray-400">
                     {loading ? t.currency.loading : (error ? t.currency.error : `${t.currency.lastUpdate}: ${lastUpdate}`)}
                 </span>
                 <button onClick={fetchRates} className="text-xs text-primary font-bold hover:underline">{t.currency.update}</button>
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {POPULAR_CURRENCIES.filter(c => c !== base).map(curr => (
                <div key={curr} className={cardClass}>
                     <span className="font-bold w-12">{curr}</span>
                     <span className={`text-lg font-bold ${designStyle === 'cyberpunk' ? 'text-white' : 'text-gray-800 dark:text-white'}`}>
                         {convert(curr)}
                     </span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default CurrencyConverter;