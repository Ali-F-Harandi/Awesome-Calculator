

import React from 'react';
import { IKeypadButton, DesignStyle } from '../types';

interface ButtonProps {
  btn: IKeypadButton;
  onClick: (val: string) => void;
  designStyle: DesignStyle;
}

const Button: React.FC<ButtonProps> = ({ btn, onClick, designStyle }) => {
  
  // Base structural classes
  // Reduced height in mobile landscape (h-10) but kept normal in desktop landscape (lg:h-16)
  const baseClasses = "h-14 sm:h-16 landscape:h-10 landscape:lg:h-14 font-semibold text-xl transition-all flex items-center justify-center select-none active:scale-95";
  
  // Style-specific Logic
  let styleClasses = "";
  
  // 1. Determine Shape/Border (handled mostly by CSS vars, but some tailwind utility needs)
  const shapeStyle = {
      borderRadius: 'var(--radius-btn)',
      borderWidth: (designStyle === 'retro' || designStyle === 'neobrutalism') ? 'var(--border-width)' : '0',
      borderColor: (designStyle === 'retro' || designStyle === 'neobrutalism') ? '#000' : 'transparent',
  };
  
  if (designStyle === 'neobrutalism' && document.documentElement.classList.contains('dark')) {
      shapeStyle.borderColor = '#ffffff';
  }

  // 2. Determine Colors based on Type & Design Style
  if (designStyle === 'retro') {
      // RETRO
      if (btn.type === 'operator') {
          styleClasses = "bg-purple-200 text-black hover:bg-purple-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";
      } else if (btn.type === 'action' && btn.value === '=') {
          styleClasses = "bg-primary text-white hover:opacity-90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";
      } else if (btn.type === 'scientific' || btn.type === 'memory') {
          styleClasses = "bg-gray-300 text-black hover:bg-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";
      } else {
          styleClasses = "bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";
      }
  } 
  else if (designStyle === 'cyberpunk') {
      // CYBERPUNK
      if (btn.type === 'operator') {
          styleClasses = "bg-gray-900 text-secondary border border-secondary shadow-[0_0_5px_rgba(var(--color-secondary),0.5)] hover:shadow-[0_0_15px_rgba(var(--color-secondary),0.8)]";
      } else if (btn.value === '=') {
          styleClasses = "bg-primary text-black font-bold border border-primary shadow-[0_0_10px_rgba(var(--color-primary),0.8)] hover:bg-primary/80";
      } else if (btn.type === 'scientific' || btn.type === 'memory') {
           styleClasses = "bg-gray-900 text-gray-400 border border-gray-700 hover:border-white hover:text-white";
      } else {
          styleClasses = "bg-gray-900 text-white border border-gray-700 hover:border-primary hover:text-primary";
      }
  } 
  else if (designStyle === 'minimal') {
      // MINIMAL
       if (btn.type === 'operator') {
          styleClasses = "bg-gray-50 dark:bg-gray-700 text-primary border border-gray-200 dark:border-gray-600";
      } else if (btn.value === '=') {
          styleClasses = "bg-black dark:bg-white text-white dark:text-black";
      } else if (btn.type === 'memory') {
          styleClasses = "bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 border border-gray-100 dark:border-gray-700 hover:text-primary";
      } else {
          styleClasses = "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
      }
  }
  else if (designStyle === 'neobrutalism') {
      // NEO-BRUTALISM (Bold, High Contrast, Hard Shadows)
      const shadowClass = "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#ffffff] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]";
      
      if (btn.type === 'operator') {
          styleClasses = `bg-yellow-300 text-black font-black ${shadowClass}`;
      } else if (btn.value === '=') {
          styleClasses = `bg-primary text-white font-black ${shadowClass}`;
      } else if (btn.type === 'action' && btn.value === 'clear') {
          styleClasses = `bg-red-500 text-white font-black ${shadowClass}`;
      } else if (btn.type === 'scientific' || btn.type === 'memory') {
          styleClasses = `bg-blue-200 text-black font-bold ${shadowClass}`;
      } else {
          styleClasses = `bg-white dark:bg-gray-800 text-black dark:text-white font-bold ${shadowClass}`;
      }
  }
  else if (designStyle === 'glass') {
      // GLASSMORPHISM FIX
      // Ensure visibility on both Light and Dark backgrounds.
      
      const glassBase = "backdrop-filter backdrop-blur-md border border-white/30 dark:border-white/10 transition-all duration-300";
      // Text color logic: Dark text on light glass (light mode), White text on dark glass (dark mode)
      const textBase = "text-gray-900 dark:text-white font-medium"; 
      
      if (btn.type === 'operator') {
          styleClasses = `${glassBase} bg-primary/30 dark:bg-primary/40 ${textBase} hover:bg-primary/50 shadow-[0_4px_10px_rgba(0,0,0,0.05)]`;
      } else if (btn.value === '=') {
          styleClasses = `${glassBase} bg-white/50 dark:bg-white/30 ${textBase} font-bold hover:bg-white/70 shadow-[0_0_15px_rgba(255,255,255,0.2)]`;
      } else if (btn.type === 'action' && (btn.value === 'clear' || btn.value === 'backspace')) {
           styleClasses = `${glassBase} bg-red-400/20 dark:bg-red-400/20 text-red-700 dark:text-red-200 hover:bg-red-400/40`;
      } else if (btn.type === 'scientific' || btn.type === 'memory') {
           styleClasses = `${glassBase} bg-white/20 dark:bg-black/20 ${textBase} hover:bg-white/30 dark:hover:bg-white/10`;
      } else {
          // Standard Numbers
          styleClasses = `${glassBase} bg-white/10 dark:bg-white/5 ${textBase} hover:bg-white/30 dark:hover:bg-white/10 shadow-[0_4px_6px_rgba(0,0,0,0.02)]`;
      }
  }
  else {
      // MODERN (Default)
      if (btn.type === 'operator') {
        styleClasses = "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 shadow-sm";
      } else if (btn.type === 'scientific') {
        styleClasses = "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 shadow-sm";
      } else if (btn.type === 'memory') {
        styleClasses = "bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors text-sm font-bold";
      } else if (btn.value === '=') {
         styleClasses = "bg-primary text-white hover:bg-opacity-90 shadow-lg shadow-primary/30";
      } else {
        styleClasses = "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm";
      }
  }

  // Allow overriding classes from config
  const gridClass = btn.className?.includes('col-span') ? btn.className.match(/col-span-\d/)?.[0] : '';
  
  // Neobrutalism text color override for AC
  let specialTextClass = btn.className?.includes('text-red') ? 'text-red-500' : '';
  if ((designStyle === 'neobrutalism' || designStyle === 'glass') && specialTextClass) {
       if (designStyle === 'neobrutalism' && btn.value === 'clear') specialTextClass = ''; // Handled in block above
       if (designStyle === 'glass') specialTextClass = ''; // Handled in block above
  }

  return (
    <button
      onClick={() => onClick(btn.value)}
      className={`${baseClasses} ${styleClasses} ${gridClass} ${specialTextClass}`}
      style={shapeStyle}
    >
      {btn.label}
    </button>
  );
};

export default Button;