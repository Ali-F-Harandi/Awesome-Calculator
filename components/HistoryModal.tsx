import React from 'react';
import { ITranslations, IHistoryItem, DesignStyle } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  history: IHistoryItem[];
  t: ITranslations;
  isRTL: boolean;
  designStyle: DesignStyle;
  variant?: 'modal' | 'sidebar'; // New Prop
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  onClear,
  history,
  t,
  isRTL,
  designStyle,
  variant = 'modal'
}) => {
  if (!isOpen) return null;

  // Base Styles
  let containerClass = "";
  let itemClass = "bg-gray-50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-600";
  let headerClass = designStyle === 'minimal' ? 'border-b border-gray-100 dark:border-gray-800' : '';
  
  // Design System Logic
  if (designStyle === 'retro') {
    containerClass = "bg-[#d4d4d2] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none font-pixel";
    itemClass = "bg-white border-2 border-black mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]";
  } else if (designStyle === 'cyberpunk') {
    containerClass = "bg-black border-2 border-primary shadow-[0_0_20px_rgba(var(--color-primary),0.5)] rounded-none font-mono";
    itemClass = "bg-gray-900 border border-secondary/50 text-secondary mb-2";
  } else if (designStyle === 'minimal') {
    containerClass = "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg";
    itemClass = "border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800";
  } else {
    // Modern
    containerClass = "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700";
  }

  // Variant Logic (Modal vs Sidebar)
  const isModal = variant === 'modal';
  
  // FIX: For Sidebar variant:
  // On Desktop (absolute parent), we want h-full to match parent.
  // On Mobile (flow), we want a fixed height or auto.
  // Since we control layout in App.tsx (absolute vs block), h-full here is safe for the desktop absolute container.
  // For mobile block in App.tsx, h-full might collapse if parent has no height? No, we set h-[500px] specifically for mobile fallback if needed, but sticking to h-full allows parent to control.
  // Let's use h-full effectively.
  
  const wrapperStyle = isModal 
    ? "absolute inset-0 z-20 flex flex-col overflow-hidden animate-fade-in" 
    : "w-full h-[500px] md:h-full flex flex-col overflow-hidden animate-fade-in shrink-0 transition-all duration-300"; 
  
  const backdrop = isModal ? (
     <div className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] ${designStyle === 'retro' ? 'bg-black/50' : ''}`} onClick={onClose}></div>
  ) : null;

  return (
    <div className={wrapperStyle} style={{ borderRadius: designStyle === 'minimal' || designStyle === 'retro' || designStyle === 'cyberpunk' ? '0' : 'var(--radius-main)' }}>
      {backdrop}
      
      <div className={`relative flex flex-col w-full h-full p-4 overflow-hidden transform transition-transform ${containerClass}`} 
           style={{ animation: isModal ? 'slideUp 0.3s ease-out' : 'fadeIn 0.3s ease-in' }}>
        
        {/* Header */}
        <div className={`flex justify-between items-center mb-4 pb-2 ${headerClass}`}>
          <h2 className={`text-lg font-bold flex items-center gap-2 ${designStyle === 'retro' ? 'text-black uppercase' : 'text-gray-800 dark:text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.history}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>{t.noHistory}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className={`p-3 rounded-lg flex flex-col items-end ${itemClass}`}>
                  <span className={`text-xs mb-1 opacity-60 ${designStyle === 'retro' ? 'text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}>
                    {new Date(item.timestamp).toLocaleTimeString(isRTL ? 'fa-IR' : 'en-US', {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  <div className={`text-sm ${designStyle === 'retro' ? 'text-gray-700' : 'text-gray-600 dark:text-gray-300'}`}>
                    {item.expression}
                  </div>
                  <div className={`text-xl font-bold ${designStyle === 'cyberpunk' ? 'text-primary' : (designStyle === 'retro' ? 'text-black' : 'text-primary')}`}>
                    = {item.result}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="mt-4 pt-2 flex justify-center">
             <button 
               onClick={onClear}
               className={`px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 transition flex items-center gap-1 ${designStyle === 'retro' ? 'border-2 border-red-500 hover:bg-red-100 text-red-600' : ''}`}
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
               </svg>
               {t.clearHistory}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;