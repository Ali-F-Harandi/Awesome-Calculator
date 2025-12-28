import React from 'react';
import { ITranslations, ThemeColor, Language, DesignStyle, HistoryMode } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: ITranslations;
  currentLang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  currentColor: ThemeColor;
  onSetColor: (color: ThemeColor) => void;
  currentStyle: DesignStyle;
  onSetStyle: (style: DesignStyle) => void;
  historyMode: HistoryMode;
  onSetHistoryMode: (mode: HistoryMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  vibrationEnabled: boolean;
  onToggleVibration: () => void;
  isRTL: boolean;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  t,
  currentLang,
  onToggleLang,
  isDark,
  onToggleTheme,
  currentColor,
  onSetColor,
  currentStyle,
  onSetStyle,
  historyMode,
  onSetHistoryMode,
  soundEnabled,
  onToggleSound,
  vibrationEnabled,
  onToggleVibration,
  isRTL
}) => {
  if (!isOpen) return null;

  const colors: ThemeColor[] = ['purple', 'blue', 'green', 'orange', 'pink'];
  const styles: DesignStyle[] = ['modern', 'retro', 'cyberpunk', 'minimal'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div 
        className={`relative bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all border border-gray-100 dark:border-gray-700 flex flex-col max-h-[90vh] ${isRTL ? 'text-right' : 'text-left'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="bg-primary/10 p-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 shrink-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t.settings}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* General Section */}
          <div className="space-y-4 pb-4 border-b border-gray-100 dark:border-gray-700">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t.settings}</h3>
             
             {/* Language */}
             <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <span className="text-gray-700 dark:text-gray-200 font-medium">{t.language}</span>
              <button 
                onClick={onToggleLang}
                className="px-4 py-1.5 rounded-md bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white font-bold text-sm border border-gray-200 dark:border-gray-500"
              >
                {currentLang === Language.EN ? 'English' : 'فارسی'}
              </button>
            </div>

            {/* Dark Mode */}
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <span className="text-gray-700 dark:text-gray-200 font-medium">{t.darkMode}</span>
              <button 
                onClick={onToggleTheme}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${isDark ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
              </button>
            </div>
            
             {/* Sound Toggle */}
             <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <span className="text-gray-700 dark:text-gray-200 font-medium">{t.sound}</span>
              <button 
                onClick={onToggleSound}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${soundEnabled ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
              </button>
            </div>

            {/* Vibration Toggle */}
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <span className="text-gray-700 dark:text-gray-200 font-medium">{t.vibration}</span>
              <button 
                onClick={onToggleVibration}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${vibrationEnabled ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
              </button>
            </div>

             {/* History Mode */}
             <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <span className="text-gray-700 dark:text-gray-200 font-medium">{t.historyMode}</span>
              <div className="flex gap-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                <button 
                  onClick={() => onSetHistoryMode('overlay')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${historyMode === 'overlay' ? 'bg-white dark:bg-gray-600 text-primary shadow-sm' : 'text-gray-500'}`}
                >
                  {t.modes.overlay}
                </button>
                <button 
                  onClick={() => onSetHistoryMode('sidebar')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${historyMode === 'sidebar' ? 'bg-white dark:bg-gray-600 text-primary shadow-sm' : 'text-gray-500'}`}
                >
                  {t.modes.sidebar}
                </button>
              </div>
            </div>

          </div>

          {/* Design Style Section */}
          <div className="space-y-3 pb-4 border-b border-gray-100 dark:border-gray-700">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t.designStyle}</h3>
             <div className="grid grid-cols-2 gap-2">
                {styles.map(style => (
                  <button
                    key={style}
                    onClick={() => onSetStyle(style)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${currentStyle === style 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}
                  >
                    {t.styles[style]}
                  </button>
                ))}
             </div>
          </div>

          {/* Theme Color Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t.selectColor}</h3>
            <div className="flex gap-3 justify-center flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onSetColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all transform hover:scale-110 ${currentColor === color ? 'border-gray-600 dark:border-white scale-110 shadow-lg' : 'border-transparent'}`}
                  style={{ backgroundColor: `var(--color-${color}-preview, ${getColorHex(color)})` }}
                  aria-label={color}
                >
                  {currentColor === color && (
                     <svg className="w-6 h-6 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

function getColorHex(color: string): string {
  switch (color) {
    case 'purple': return '#6366f1';
    case 'blue': return '#3b82f6';
    case 'green': return '#10b981';
    case 'orange': return '#f97316';
    case 'pink': return '#ec4899';
    default: return '#6366f1';
  }
}

export default SettingsModal;