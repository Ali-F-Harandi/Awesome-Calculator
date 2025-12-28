import React, { useState, useEffect } from 'react';
import { Language, ThemeColor, DesignStyle, HistoryMode, IHistoryItem } from './types';
import { dictionary } from './data/locales';
import Calculator from './components/Calculator';
import SettingsModal from './components/SettingsModal';
import HistoryModal from './components/HistoryModal';

const App: React.FC = () => {
  // --- State Management ---
  
  const [lang, setLang] = useState<Language>(() => 
    (localStorage.getItem('app_lang') as Language) || Language.FA
  );
  
  const [isDark, setIsDark] = useState<boolean>(() => 
    localStorage.getItem('app_theme') === 'dark' || 
    (!localStorage.getItem('app_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const [themeColor, setThemeColor] = useState<ThemeColor>(() => 
    (localStorage.getItem('app_color') as ThemeColor) || 'purple'
  );

  const [designStyle, setDesignStyle] = useState<DesignStyle>(() => 
    (localStorage.getItem('app_style') as DesignStyle) || 'modern'
  );

  // New: History Mode
  const [historyMode, setHistoryMode] = useState<HistoryMode>(() => 
    (localStorage.getItem('app_history_mode') as HistoryMode) || 'overlay'
  );

  // New: Sound & Vibration Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => 
    localStorage.getItem('app_sound') !== 'false'
  );
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(() => 
    localStorage.getItem('app_vibration') !== 'false'
  );

  // New: Lifted History State
  const [history, setHistory] = useState<IHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('calc_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // --- Effects ---

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => { localStorage.setItem('app_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('app_color', themeColor); }, [themeColor]);
  useEffect(() => { localStorage.setItem('app_style', designStyle); }, [designStyle]);
  useEffect(() => { localStorage.setItem('app_history_mode', historyMode); }, [historyMode]);
  
  // Save Audio/Haptic settings
  useEffect(() => { localStorage.setItem('app_sound', String(soundEnabled)); }, [soundEnabled]);
  useEffect(() => { localStorage.setItem('app_vibration', String(vibrationEnabled)); }, [vibrationEnabled]);
  
  // Save history
  useEffect(() => {
    localStorage.setItem('calc_history', JSON.stringify(history));
  }, [history]);

  // --- Handlers ---

  const toggleLang = () => {
    setLang(prev => prev === Language.EN ? Language.FA : Language.EN);
  };

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleAddToHistory = (expression: string, resultValue: string) => {
    const newItem: IHistoryItem = {
      id: Date.now().toString(),
      expression,
      result: resultValue,
      timestamp: Date.now()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50));
  };

  const handleClearHistory = () => setHistory([]);
  const toggleHistoryOpen = () => setIsHistoryOpen(prev => !prev);

  const t = dictionary[lang];
  const isRTL = lang === Language.FA;

  return (
    // Add 'style-{designStyle}' class to root
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative font-sans transition-colors duration-300 theme-${themeColor} style-${designStyle}`}
      style={{ fontFamily: isRTL ? 'var(--font-fa), sans-serif' : 'var(--font-latin), sans-serif' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Wrapper (Handles overflow hidden for blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Top Controls: Quick Actions + Settings */}
      <div className="absolute top-4 right-4 left-4 flex justify-between items-center z-20">
        <div className="flex gap-2">
            {/* Quick Action: Language */}
            <button 
               onClick={toggleLang}
               className="px-3 py-1.5 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-lg shadow-sm text-sm font-bold text-gray-700 dark:text-gray-200 border border-white/20 hover:bg-white/70 transition"
            >
               {lang === Language.EN ? 'EN' : 'FA'}
            </button>
            {/* Quick Action: Theme */}
            <button 
               onClick={toggleTheme}
               className="p-1.5 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-lg shadow-sm text-gray-700 dark:text-gray-200 border border-white/20 hover:bg-white/70 transition"
            >
               {isDark ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
               )}
            </button>
        </div>
        
        <div className="flex items-center gap-3">
             <span className="text-xs font-bold text-gray-400 opacity-60 hidden sm:block">v1.5.1</span>
             <button 
               onClick={() => setIsSettingsOpen(true)}
               className="p-2 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm hover:bg-white/80 dark:hover:bg-black/40 transition text-gray-800 dark:text-gray-100 group"
               aria-label={t.settings}
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
             </button>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className={`relative z-10 max-w-sm transition-transform duration-300 ease-out`}
           style={{ 
             transform: (historyMode === 'sidebar' && isHistoryOpen && window.innerWidth >= 768) 
               ? (isRTL ? 'translateX(100px)' : 'translateX(-100px)') 
               : 'none'
           }}>
          
          {/* Wrapper for Calculator and Sidebar */}
          <div className="relative">
             
             {/* Calculator Section - The Height Driver */}
             <Calculator 
                t={t} 
                isRTL={isRTL} 
                designStyle={designStyle} 
                history={history}
                onAddToHistory={handleAddToHistory}
                onToggleHistory={toggleHistoryOpen}
                onClearHistory={handleClearHistory}
                isHistoryOpen={isHistoryOpen}
                historyMode={historyMode}
                soundEnabled={soundEnabled}
                vibrationEnabled={vibrationEnabled}
              />

             {/* Sidebar Panel (Desktop: Absolute) */}
             {historyMode === 'sidebar' && isHistoryOpen && (
                 <div className="hidden md:block absolute top-0 bottom-0 w-80"
                      style={{ 
                        [isRTL ? 'right' : 'left']: '100%', 
                        [isRTL ? 'marginRight' : 'marginLeft']: '1rem' 
                      }}>
                     <HistoryModal 
                         isOpen={isHistoryOpen} 
                         onClose={toggleHistoryOpen} 
                         onClear={handleClearHistory}
                         history={history}
                         t={t}
                         isRTL={isRTL}
                         designStyle={designStyle}
                         variant="sidebar"
                     />
                 </div>
             )}
          </div>
          
          {/* Sidebar Panel (Mobile: Flow) */}
          {historyMode === 'sidebar' && isHistoryOpen && (
              <div className="md:hidden w-full mt-4">
                  <HistoryModal 
                      isOpen={isHistoryOpen} 
                      onClose={toggleHistoryOpen} 
                      onClear={handleClearHistory}
                      history={history}
                      t={t}
                      isRTL={isRTL}
                      designStyle={designStyle}
                      variant="sidebar"
                  />
              </div>
          )}

      </div>

      <footer className="mt-8 text-center z-10">
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {t.footerRole}
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
          {isRTL ? 'توسعه دهنده:' : 'Developed by:'} <a href="https://github.com/Ali-F-Harandi/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">{t.footerName}</a>
        </p>
      </footer>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        t={t}
        currentLang={lang}
        onToggleLang={toggleLang}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        currentColor={themeColor}
        onSetColor={setThemeColor}
        currentStyle={designStyle}
        onSetStyle={setDesignStyle}
        historyMode={historyMode}
        onSetHistoryMode={setHistoryMode}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(p => !p)}
        vibrationEnabled={vibrationEnabled}
        onToggleVibration={() => setVibrationEnabled(p => !p)}
        isRTL={isRTL}
      />
    </div>
  );
};

export default App;