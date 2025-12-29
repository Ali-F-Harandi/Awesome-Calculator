

import React from 'react';
import { motion } from 'framer-motion';
import { AppMode, ITranslations, DesignStyle } from '../types';

interface ModeSwitcherProps {
  currentMode: AppMode;
  onSwitch: (mode: AppMode) => void;
  t: ITranslations;
  designStyle: DesignStyle;
}

// Definition of a mode item
interface ModeDef {
    id: AppMode;
    label: string;
    icon: React.ReactNode;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, onSwitch, t, designStyle }) => {
  
  // 1. Define all modes map
  const modes: Record<AppMode, ModeDef> = {
    standard: {
      id: 'standard',
      label: t.appModes.standard,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    },
    scientific: {
      id: 'scientific',
      label: t.appModes.scientific,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    },
    programmer: {
      id: 'programmer',
      label: t.appModes.programmer,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    },
    graphing: {
      id: 'graphing',
      label: t.appModes.graphing,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
    },
    solver: {
      id: 'solver',
      label: t.appModes.solver,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m-6 0l-3 3m3-3l-3-3M9 17h6M9 17l-3 3m3-3l-3-3M12 7v10" /></svg>
    },
    matrix: {
      id: 'matrix',
      label: t.appModes.matrix,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
    },
    statistics: {
      id: 'statistics',
      label: t.appModes.statistics,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    engineering: {
      id: 'engineering',
      label: t.appModes.engineering,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    geometry: {
      id: 'geometry',
      label: t.appModes.geometry,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    },
    learning: {
      id: 'learning',
      label: t.appModes.learning,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    game: {
      id: 'game',
      label: t.appModes.game,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    ai: {
      id: 'ai',
      label: t.appModes.ai,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    },
    camera: {
      id: 'camera',
      label: t.appModes.camera,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    converter: {
      id: 'converter',
      label: t.appModes.converter,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
    },
    currency: {
      id: 'currency',
      label: t.appModes.currency,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    finance: {
      id: 'finance',
      label: t.appModes.finance,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    time: {
      id: 'time',
      label: t.appModes.time,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    }
  };

  // 2. Define Groups
  const groups: AppMode[][] = [
    ['standard', 'scientific', 'programmer'], // Core
    ['graphing', 'solver', 'matrix', 'statistics', 'engineering', 'geometry'], // Advanced
    ['learning', 'game', 'ai', 'camera'], // Fun & Intelligence
    ['converter', 'currency', 'finance', 'time'], // Utility
  ];

  // Base layout: Horizontal scroll on mobile, Vertical 2-Col Grid on Desktop (md+)
  let containerClass = "flex items-center w-full overflow-x-auto p-1 " +
                       "md:grid md:grid-cols-2 md:w-[8.5rem] md:h-full md:content-start md:gap-2 md:overflow-y-auto md:overflow-x-hidden custom-scrollbar";
  
  // Theme Overrides
  if (designStyle === 'retro') {
      containerClass += " bg-gray-300 border-2 border-black md:border-r-2 md:border-b-0"; 
  } else if (designStyle === 'minimal') {
      containerClass += " bg-transparent border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 rounded-none pb-2 md:pb-0 md:pr-2";
  } else if (designStyle === 'cyberpunk') {
      containerClass += " bg-black border border-gray-800";
  } else if (designStyle === 'neobrutalism') {
      containerClass += " bg-white dark:bg-gray-700 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#ffffff]";
  } else if (designStyle === 'glass') {
      containerClass += " bg-white/20 dark:bg-black/20 rounded-2xl border border-white/30 backdrop-blur-md";
  } else {
      // Modern
      containerClass += " bg-gray-100 dark:bg-gray-800 rounded-2xl";
  }

  // Divider Class (Horizontal on Desktop spanning 2 cols)
  let dividerClass = "w-[1px] h-6 mx-2 md:col-span-2 md:w-full md:h-[1px] md:mx-0 md:my-1 shrink-0";
  if (designStyle === 'retro') dividerClass += " bg-black";
  else if (designStyle === 'cyberpunk') dividerClass += " bg-gray-800";
  else if (designStyle === 'glass') dividerClass += " bg-white/20";
  else dividerClass += " bg-gray-300 dark:bg-gray-600";

  return (
    <div className={`w-full md:w-auto md:h-full shrink-0 ${designStyle === 'minimal' ? 'pb-1 md:pb-0' : 'mb-2 md:mb-0 md:mr-2'}`}>
      <div className={containerClass}>
        
        {groups.map((group, gIdx) => (
          <React.Fragment key={gIdx}>
            {/* Render Items in Group */}
            {group.map((modeId) => {
              const mode = modes[modeId];
              const isActive = currentMode === mode.id;
              
              let textColor = 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300';
              if (isActive) {
                 if (designStyle === 'minimal') textColor = 'text-primary';
                 else if (designStyle === 'retro') textColor = 'text-black';
                 else if (designStyle === 'cyberpunk') textColor = 'text-black';
                 else if (designStyle === 'neobrutalism') textColor = 'text-black';
                 else if (designStyle === 'glass') textColor = 'text-primary dark:text-white font-bold';
                 else textColor = 'text-gray-800 dark:text-white';
              } else if (designStyle === 'glass') {
                 textColor = 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white';
              } else if (designStyle === 'neobrutalism') {
                  textColor = 'text-gray-500 dark:text-gray-300';
              }

              return (
                <button
                  key={mode.id}
                  onClick={() => onSwitch(mode.id)}
                  className={`relative z-10 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-all duration-300 outline-none rounded-xl overflow-hidden shrink-0
                    ${isActive ? 'px-3 md:px-0 md:py-2' : 'px-3 w-auto md:w-full md:px-0 md:py-2'}
                    ${textColor}
                    md:flex-col md:items-center md:justify-center md:aspect-square
                  `}
                  title={mode.label}
                >
                  <>
                  {isActive && designStyle !== 'minimal' && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-xl shadow-sm ${
                          designStyle === 'retro' ? 'bg-white border-2 border-black shadow-none' : 
                          designStyle === 'cyberpunk' ? 'bg-primary border border-primary box-shadow-[0_0_10px_rgba(var(--color-primary),0.5)]' :
                          designStyle === 'neobrutalism' ? 'bg-yellow-300 border-2 border-black shadow-none' :
                          designStyle === 'glass' ? 'bg-white/70 dark:bg-white/10 shadow-lg backdrop-blur-xl' :
                          'bg-white dark:bg-gray-600'
                      }`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  {/* Minimal Line Indicator */}
                  {isActive && designStyle === 'minimal' && (
                     <motion.div
                       layoutId="activeLine"
                       className="absolute bottom-[-9px] left-0 right-0 h-[2px] md:bottom-0 md:top-0 md:left-auto md:right-auto md:w-full md:h-[2px] bg-primary"
                     />
                  )}
                  
                  <div className="relative z-20 flex flex-col items-center justify-center w-full">
                     {mode.icon}
                     {/* Label: Small on desktop grid */}
                     <span 
                        className={`
                            whitespace-nowrap overflow-hidden transition-all
                            ${isActive ? 'inline-block opacity-100' : 'hidden md:inline-block md:opacity-100'} 
                            md:text-[9px] md:font-bold md:tracking-tight md:mt-1
                            ml-2 md:ml-0
                        `}
                     >
                        {mode.label}
                     </span>
                  </div>
                  </>
                </button>
              );
            })}
            
            {/* Divider between groups (except last) */}
            {gIdx < groups.length - 1 && (
                <div className={dividerClass} />
            )}
          </React.Fragment>
        ))}
        
      </div>
    </div>
  );
};

export default ModeSwitcher;
