

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DesignStyle, ITranslations } from '../types';

interface DisplayProps {
  value: string;
  formula: string; 
  resultPreview: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isRTL: boolean;
  designStyle: DesignStyle;
  onCopy: () => void;
  memoryActive: boolean; 
  t?: ITranslations;
  onVoiceInput?: (text: string) => void; // New Prop
}

const Display: React.FC<DisplayProps> = ({ 
  value, 
  formula,
  resultPreview, 
  placeholder, 
  onChange, 
  onKeyDown,
  isRTL,
  designStyle,
  onCopy,
  memoryActive,
  t,
  onVoiceInput
}) => {
  
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        setVoiceSupported(true);
    }
  }, []);

  const handleVoice = () => {
      if (!voiceSupported) return;

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = isRTL ? 'fa-IR' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
          setIsListening(true);
      };

      recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          // Simple cleanup for math
          let cleaned = transcript.toLowerCase()
            .replace(/plus/g, '+').replace(/به اضافه/g, '+').replace(/جمع/g, '+')
            .replace(/minus/g, '-').replace(/منهای/g, '-').replace(/کم/g, '-')
            .replace(/times/g, '*').replace(/ضربدر/g, '*')
            .replace(/divide/g, '/').replace(/تقسیم/g, '/');
          
          if (onVoiceInput) onVoiceInput(cleaned);
          setIsListening(false);
      };

      recognition.onerror = () => {
          setIsListening(false);
      };

      recognition.onend = () => {
          setIsListening(false);
      };

      recognition.start();
  };

  // Dynamic Styling Logic
  let containerClass = "";
  
  if (designStyle === 'retro') {
      containerClass = "bg-[#d4d4d2] border-4 border-black shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]";
  } else if (designStyle === 'cyberpunk') {
      containerClass = "bg-black border border-gray-700 focus-within:border-primary focus-within:shadow-[0_0_15px_rgba(var(--color-primary),0.5)]";
  } else if (designStyle === 'minimal') {
      containerClass = "bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus-within:border-primary px-0 rounded-none";
  } else if (designStyle === 'neobrutalism') {
      containerClass = "bg-white dark:bg-gray-800 border-3 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#ffffff]";
  } else if (designStyle === 'glass') {
      containerClass = "bg-white/20 dark:bg-black/20 backdrop-filter backdrop-blur-lg border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]";
  } else {
      // Modern
      containerClass = "bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus-within:border-primary shadow-inner";
  }

  let textClass = designStyle === 'retro' ? 'text-black' : 'text-gray-800 dark:text-gray-100';
  if (designStyle === 'glass') textClass = 'text-gray-900 dark:text-white drop-shadow-sm'; // Fixed contrast for light mode
  if (designStyle === 'neobrutalism') textClass = 'text-black dark:text-white font-black';
  
  const handleCopyClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Memory indicator style
  let memoryClass = `text-[10px] font-bold px-1.5 py-0.5 rounded border ${designStyle === 'retro' ? 'border-black text-black' : 'border-primary text-primary'}`;
  if (designStyle === 'glass') memoryClass = "text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-400 dark:border-white/40 text-gray-800 dark:text-white bg-white/30";
  if (designStyle === 'neobrutalism') memoryClass = "text-[10px] font-bold px-1.5 py-0.5 rounded border-2 border-black dark:border-white bg-yellow-300 text-black";

  return (
    <div 
      className={`flex flex-col gap-0 mb-4 p-4 transition-all relative group ${containerClass} h-[140px] landscape:h-full landscape:lg:h-[140px]`}
      style={{ borderRadius: designStyle === 'minimal' ? '0' : 'var(--radius-btn)', justifyContent: 'space-between' }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-start h-6 z-10">
         {memoryActive ? (
            <motion.span 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className={memoryClass}
                title={t?.memoryTooltip}
            >
                M
            </motion.span>
        ) : <div></div>}

        <div className="flex gap-2">
            {voiceSupported && (
                <button
                    onClick={handleVoice}
                    className={`p-1 rounded transition-all ${isListening ? 'text-red-500 animate-pulse' : (designStyle === 'glass' ? 'text-gray-600 dark:text-white/70' : 'text-gray-400 hover:text-primary')}`}
                    title={isListening ? t?.voice.listening : 'Voice Input'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isListening ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
            )}

            {(value || formula) && (
            <button 
                onClick={handleCopyClick}
                className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 shrink-0 ${copied ? 'text-green-500' : (designStyle === 'glass' ? 'text-gray-600 dark:text-white/70' : 'text-gray-400')}`}
            >
                {copied ? <span className="text-xs">✔</span> : <span className="text-xs">Copy</span>}
            </button>
            )}
        </div>
      </div>

      {/* Main Display Area */}
      <div className="flex flex-col items-end justify-end h-full w-full relative">
         
         {/* Formula Display (Previous Calculation) */}
         {formula && (
             <div className={`w-full text-right pointer-events-none absolute bottom-12 right-0 z-0 opacity-60 text-sm font-mono ${textClass}`}>
                {formula}
             </div>
         )}

         {/* Result Preview */}
         {resultPreview && !formula && (
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                className={`text-xs absolute bottom-10 left-0 ${designStyle === 'glass' ? 'text-gray-500 dark:text-white/60' : 'text-gray-400'}`}
             >
                 = {resultPreview}
             </motion.div>
         )}

         {/* Actual Input */}
         {/* Strict LTR is kept to ensure parentheses ( ) don't flip in Persian mode */}
         <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={isListening ? t?.voice.listening : placeholder}
            className={`w-full bg-transparent text-3xl font-bold outline-none font-mono ${textClass} text-right z-10 placeholder-gray-300 dark:placeholder-gray-600 ${designStyle === 'glass' ? '!placeholder-gray-400 dark:!placeholder-white/30' : ''}`}
            style={{ direction: 'ltr' }} 
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
      </div>
    </div>
  );
};

export default Display;