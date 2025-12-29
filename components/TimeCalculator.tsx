

import React, { useState, useEffect } from 'react';
import { ITranslations, DesignStyle } from '../types';

interface TimeCalculatorProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
}

const ZONES = [
    { label: 'Tehran', zone: 'Asia/Tehran' },
    { label: 'London', zone: 'Europe/London' },
    { label: 'New York', zone: 'America/New_York' },
    { label: 'Tokyo', zone: 'Asia/Tokyo' },
    { label: 'Dubai', zone: 'Asia/Dubai' },
    { label: 'Sydney', zone: 'Australia/Sydney' },
    { label: 'Los Angeles', zone: 'America/Los_Angeles' },
    { label: 'Paris', zone: 'Europe/Paris' },
    { label: 'Moscow', zone: 'Europe/Moscow' },
];

const TimeCalculator: React.FC<TimeCalculatorProps> = ({ t, designStyle, isRTL }) => {
  const [now, setNow] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState(ZONES[0].zone);

  useEffect(() => {
      const timer = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(timer);
  }, []);

  const getTimeInZone = (zone: string) => {
      try {
          return new Date().toLocaleTimeString('en-US', { timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      } catch { return '--:--'; }
  };

  const getDiff = (zone: string) => {
      const local = new Date();
      const targetStr = new Date().toLocaleString('en-US', { timeZone: zone });
      const target = new Date(targetStr);
      
      const diffMs = target.getTime() - local.getTime();
      const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
      
      if (diffHrs === 0) return 'Same time';
      return `${Math.abs(diffHrs)}h ${diffHrs > 0 ? t.time.ahead : t.time.behind}`;
  };

  const cardClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-3 mb-2 font-mono flex justify-between items-center'
    : designStyle === 'cyberpunk'
    ? 'bg-gray-900 border border-gray-700 p-3 mb-2 rounded flex justify-between items-center text-primary shadow-[0_0_5px_rgba(var(--color-primary),0.2)]'
    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-2 flex justify-between items-center shadow-sm';

  return (
    <div className={`flex flex-col h-full overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Main Clock */}
        <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 mb-4 text-center">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t.time.current}</h2>
            <div className="text-4xl font-black text-gray-800 dark:text-white font-mono">
                {now.toLocaleTimeString(isRTL ? 'fa-IR' : 'en-US')}
            </div>
            <div className="text-sm text-gray-500 mt-1">
                {now.toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
        </div>

        <h3 className="text-sm font-bold text-gray-400 uppercase mb-2 px-2">{t.time.worldClock}</h3>
        
        {/* World List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
             {ZONES.map((z) => (
                 <div key={z.label} className={cardClass}>
                     <div>
                         <div className="font-bold text-gray-700 dark:text-gray-200">{z.label}</div>
                         <div className="text-[10px] text-gray-400">{getDiff(z.zone)}</div>
                     </div>
                     <div className="text-xl font-bold font-mono text-gray-800 dark:text-white">
                         {getTimeInZone(z.zone)}
                     </div>
                 </div>
             ))}
        </div>
    </div>
  );
};

export default TimeCalculator;