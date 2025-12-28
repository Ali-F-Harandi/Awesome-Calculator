import React, { useState } from 'react';
import { DesignStyle, ITranslations } from '../types';

interface DisplayProps {
  value: string;
  resultPreview: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isRTL: boolean;
  designStyle: DesignStyle;
  onCopy: () => void;
  memoryActive: boolean; // New
  t?: ITranslations; // Optional now, but useful for tooltip
}

const Display: React.FC<DisplayProps> = ({ 
  value, 
  resultPreview, 
  placeholder, 
  onChange, 
  onKeyDown,
  isRTL,
  designStyle,
  onCopy,
  memoryActive,
  t
}) => {
  
  const [copied, setCopied] = useState(false);

  // Dynamic Styling Logic
  let containerClass = "bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus-within:border-primary shadow-inner";
  
  if (designStyle === 'retro') {
      containerClass = "bg-[#d4d4d2] border-4 border-black shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]";
  } else if (designStyle === 'cyberpunk') {
      containerClass = "bg-black border border-gray-700 focus-within:border-primary focus-within:shadow-[0_0_15px_rgba(var(--color-primary),0.5)]";
  } else if (designStyle === 'minimal') {
      containerClass = "bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus-within:border-primary px-0 rounded-none";
  }

  const textClass = designStyle === 'retro' ? 'text-black' : 'text-gray-800 dark:text-gray-100';
  const placeholderClass = designStyle === 'retro' ? 'placeholder-gray-500' : 'placeholder-gray-300 dark:placeholder-gray-600';

  const handleCopyClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`flex flex-col gap-2 mb-4 p-4 transition-all relative group ${containerClass}`}
      style={{ borderRadius: designStyle === 'minimal' ? '0' : 'var(--radius-btn)' }}
    >
      <div className="flex justify-between items-start min-h-[1.5rem]">
        {/* Left: Memory Indicator & Result Preview */}
        <div className="flex items-center gap-2 overflow-hidden w-full">
            
            {/* Memory Indicator */}
            {memoryActive && (
                <span 
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${designStyle === 'retro' ? 'border-black text-black' : 'border-primary text-primary'}`}
                    title={t?.memoryTooltip}
                >
                    M
                </span>
            )}

            <div className={`text-right text-sm font-mono truncate w-full ${designStyle === 'retro' ? 'text-gray-600' : 'text-gray-400'}`}>
              {resultPreview}
            </div>
        </div>
        
        {/* Right: Copy Button */}
        {(value || resultPreview) && (
          <button 
            onClick={handleCopyClick}
            className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 shrink-0 ${copied ? 'text-green-500' : 'text-gray-400'}`}
            title="Copy Result"
          >
             {copied ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
               </svg>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
             )}
          </button>
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`w-full bg-transparent text-3xl font-bold outline-none font-mono ${textClass} ${placeholderClass}`}
        style={{ direction: 'ltr', textAlign: 'right' }} 
        autoFocus
      />
    </div>
  );
};

export default Display;