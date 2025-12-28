import React from 'react';
import { IKeypadButton, DesignStyle } from '../types';

interface ButtonProps {
  btn: IKeypadButton;
  onClick: (val: string) => void;
  designStyle: DesignStyle;
}

const Button: React.FC<ButtonProps> = ({ btn, onClick, designStyle }) => {
  
  // Base structural classes
  const baseClasses = "h-14 sm:h-16 font-semibold text-xl transition-all flex items-center justify-center select-none active:scale-95";
  
  // Style-specific Logic
  let styleClasses = "";
  
  // 1. Determine Shape/Border (handled mostly by CSS vars, but some tailwind utility needs)
  const shapeStyle = {
      borderRadius: 'var(--radius-btn)',
      borderWidth: designStyle === 'retro' ? '2px' : '0',
      borderColor: designStyle === 'retro' ? '#000' : 'transparent',
  };

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
  const specialTextClass = btn.className?.includes('text-red') ? 'text-red-500' : '';

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